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
  temperature: 1,
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
          const updatedDiscussions = discussions.filter(
            (discussion) => discussion.id !== id
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

      const prompt = `
      Kamu adalah asisten admin untuk memberikan respon diskusi aduan kepada user. jawablah sesuai dengan informasi template respon yang dibuat.
      Langsung berikan isi responnya saja, tidak perlu basa-basi. 
      
      Alur Status Aduan:
      1. Pending (0-2 hari kerja): Menunggu verifikasi admin
      2. Verifikasi (0-3 hari): Menunggu tim tindak lanjut
      3. On Progress: Tim sedang menangani di lokasi
      4. Selesai: Aduan telah diselesaikan dengan bukti
      5. Ditolak: Tidak memenuhi persyaratan

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
          "Aduan Anda telah selesai ditindaklanjuti. Silakan periksa lampiran bukti penyelesaian yang kami sertakan.",
          "Terima kasih atas kesabaran Anda. Permasalahan telah kami selesaikan sesuai standar yang berlaku.",
          "Proses penanganan aduan Anda telah rampung. Dokumen pendukung dapat Anda unduh pada halaman ini."
        ],
        "ditolak": [
          "Maaf, aduan Anda tidak dapat kami proses karena tidak memenuhi persyaratan kelengkapan data.",
          "Aduan Anda ditolak. Silakan periksa kembali kelengkapan dokumen dan informasi yang dibutuhkan.",
          "Kami tidak dapat menindaklanjuti aduan Anda karena beberapa persyaratan tidak terpenuhi."
        ]
      }

      Deskripsi aduan:
      - ID Aduan: ${complaint.id}
      - Deskripsi: ${complaint.description}
      - Status saat ini: ${complaint.status}
    `;

      // Mengirim permintaan ke Gemini
      const result = await chatSession.sendMessage(prompt);
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
