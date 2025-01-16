import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MySwal = withReactContent(Swal);

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const useDiskusiAduan = (complaint, discussions) => {
  const [recommendation, setRecommendation] = useState("");
  const [textInput, setTextInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingRecommendation, setIsFetchingRecommendation] =
    useState(false);
  const [newDiscussion, setNewDiscussion] = useState(null);
  const [error, setError] = useState(null);

  const handleDeleteDiscussion = async (id) => {
    MySwal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = sessionStorage.getItem("token");
          await axios.delete(
            `http://localhost:8000/api/v1/complaints/${complaint.id}/discussions/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNewDiscussion(null);
          setTextInput("");
          MySwal.fire("Terhapus!", "Diskusi telah dihapus.", "success");
        } catch (error) {
          console.error("Error deleting discussion:", error);
          MySwal.fire("Gagal!", "Gagal menghapus diskusi.", "error");
        }
      }
    });
  };

  const fetchRecommendation = async () => {
    setIsFetchingRecommendation(true);
    try {
      // Memulai sesi percakapan dengan Gemini API
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      // Mengirim permintaan ke Gemini
      const result = await chatSession.sendMessage(
        `Kamu adalah admin di aplikasi e-complaint bernama Keluhprov. Berikan respon atau jawaban untuk pengaduan sesuai dengan statusnya ${complaint.status}. Keterangan mengenai status aduan sebagai berikut:Pending (0-2 hari kerja): Menunggu verifikasi admin,
        Verifikasi (0-3 hari): Menunggu tim tindak lanjut, On Progress: Tim sedang menangani di lokasi, Selesai: Aduan telah diselesaikan dengan bukti,
        Ditolak: Tidak memenuhi persyaratan
        Kamu dapat menggunakan template respon seperti di bawah ini sesuai dengan status aduan dibahas. Berikanlah jawaban selayaknya kamu adalah admin atau customer
        service-nya. Jawablah dengan memberikan responnya saja. 
TEMPLATE_RESPON = {
    "pending": [
        "Terima kasih telah mengajukan aduan. Saat ini aduan Anda sedang kami verifikasi. Mohon tunggu maksimal 2 hari kerja.",
        "Aduan Anda sudah kami terima dan sedang dalam proses verifikasi. Kami akan segera menindaklanjuti.",
        "Mohon bersabar, tim kami sedang memeriksa kelengkapan data aduan Anda."
    ],
    "verifikasi": [
        "Aduan Anda telah terverifikasi. Kami akan segera menugaskan tim untuk melakukan peninjauan di lokasi dalam waktu 3 hari ke depan.",
        "Terima kasih atas detail aduan yang Anda berikan. Tim kami sedang mempersiapkan proses penanganan.",
        "Status aduan Anda saat ini sudah terverifikasi. Mohon menunggu proses selanjutnya."
    ],
    "on_progress": [
        "Tim kami saat ini sedang berada di lokasi untuk menindaklanjuti aduan Anda. Kami akan memberikan update secara berkala.",
        "Proses penanganan aduan Anda tengah berlangsung. Kami akan segera menyelesaikan permasalahan.",
        "Saat ini tim teknis sedang melakukan pemeriksaan dan penanganan di lokasi aduan."
    ],
    "selesai": [
        "Aduan Anda telah selesai ditindaklanjuti. Silakan periksa lampiran bukti penyelesaian yang kami sertakan. (jika sudah ada buktinya)",
        "Terima kasih atas kesabaran Anda. Permasalahan telah kami selesaikan sesuai standar yang berlaku. (jika belum ada bukti)"
    ],
    "ditolak": [
        "Maaf, aduan Anda tidak dapat kami proses karena tidak memenuhi persyaratan kelengkapan data.",
        "Aduan Anda ditolak. Silakan periksa kembali kelengkapan dokumen dan informasi yang dibutuhkan.",
        "Kami tidak dapat menindaklanjuti aduan Anda karena beberapa persyaratan tidak terpenuhi."
    ]   `
      );
      // Menangkap jawaban dari Gemini
      const recommendedAnswer = result.response.text();
      setRecommendation(recommendedAnswer);
      setTextInput(recommendedAnswer);
      setIsFetchingRecommendation(false);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setIsFetchingRecommendation(false);
    }
  };

  const postDiscussion = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8000/api/v1/complaints/${complaint.id}/discussions`,
        {
          comment: textInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewDiscussion(response.data.data);
      setTextInput("");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error posting discussion:", error);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (newDiscussion) {
      MySwal.fire("Berhasil!", "Diskusi telah terkirim.", "success");
    }
  }, [newDiscussion]);

  useEffect(() => {
    setError(null);
    if (discussions.length === 0) {
      setError("Tidak ada diskusi ditemukan.");
    }
  }, [discussions]);

  return {
    recommendation,
    setRecommendation,
    textInput,
    setTextInput,
    isSubmitting,
    isFetchingRecommendation,
    newDiscussion,
    error,
    handleDeleteDiscussion,
    fetchRecommendation,
    postDiscussion,
  };
};

export default useDiskusiAduan;
