import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios"; 

const MySwal = withReactContent(Swal);

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
      const token = sessionStorage.getItem("token"); 
      const response = await axios.get(
        `http://localhost:8000/api/v1/complaints/${complaint.id}/discussions/get-recommendation`,
        {
          headers: {
            // Mengatur header untuk request
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setRecommendation(response.data.data.answer);
      setTextInput(response.data.data.answer); 
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
            // Mengatur header untuk request
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
