/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import HeaderLayout from "../Header/HeaderLayout";
import SidebarLayout from "../Header/SidebarLayout";
import ProsesAduan from "./ProsesAduan";
import DiskusiAduan from "./DiskusiAduan";
import Content from "./Content";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Plugin untuk UTC
import timezone from "dayjs/plugin/timezone"; // Plugin untuk timezone
import localizedFormat from "dayjs/plugin/localizedFormat"; // Plugin untuk format waktu lokal

// Mengaktifkan plugin dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

const DetailComplaintLayout = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");
  const [refreshProcess, setRefreshProcess] = useState(false);
  const Navigate = useNavigate()

  useEffect(() => {
    fetchComplaintDetails();
    fetchComplaintDiscussions();
  }, [id]);

  const fetchComplaintDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/v1/complaints/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComplaint(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching complaint details:", error);
      setLoading(false);
    }
  };

  const fetchComplaintDiscussions = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/v1/complaints/${id}/discussions`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDiscussions(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    // Set deskripsi berdasarkan opsi dropdown yang dipilih
    switch (e.target.value) {
      case "Pending":
        setTextInput("Aduan anda akan segera diperiksa");
        break;
      case "Verifikasi":
        setTextInput("Aduan anda telah terverifikasi");
        break;
      case "On Progress":
        setTextInput("Aduan anda sedang diproses");
        break;
      case "Selesai":
        setTextInput("Aduan anda telah selesai");
        break;
      case "Ditolak":
        setTextInput("Aduan anda ditolak");
        break;
      default:
        setTextInput("");
        break;
    }
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleStatusUpdate = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8000/api/v1/complaints/${id}/processes`,
        {
          status: selectedOption,
          message: textInput,
          updated_at: dayjs().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Complaint status updated successfully",
      }).then(() => {
        // Refresh data setelah berhasil update
        fetchComplaintDetails();
        fetchComplaintDiscussions();
        handleCloseModal();
        // Perbarui state untuk memicu refresh di ProsesAduan
        setRefreshProcess((prev) => !prev); // Membalik nilai refreshProcess
      });
    } catch (error) {
      console.error("Error updating complaint process:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update complaint status",
      });
    }
  };

  //! Hapus complaint
  const handleDeleteComplaint = async (complaintId) => {
    try {
      const token = sessionStorage.getItem('token');
      const confirmed = await confirmDelete();

      if (!confirmed) return;

      const response = await axios.delete(`http://localhost:8000/api/v1/complaints/${complaintId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your complaint has been deleted.',
          icon: 'success',
          confirmButtonColor: '#DC2626',
        });
        setComplaint(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      Navigate('/complaint');
    } catch (error) {
      console.error('Error deleting complaint:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete complaint.',
        icon: 'error',
        confirmButtonColor: '#2563EB',
      });
    }
  };

  const confirmDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#2563EB',
      reverseButtons: true,
    });

    return result.isConfirmed;
  };

  // Menampilkan loading spinner atau teks saat data masih dimuat
  if (loading) {
    return <p>Loading...</p>;
  }

  // Menampilkan pesan jika tidak ada data complaint yang ditemukan
  if (!complaint) {
    return <p>Complaint not found.</p>;
  }

  return (
    <section className="flex w-full flex-col">
      <HeaderLayout />
      <SidebarLayout />
      <div className="min-h-[80dvh] max-h-max overflow-y-auto bg-light-2">
        <main className="lg:ml-80 py-3 pb-10 px-2 lg:pr-7">
          <h1 className="font-poppins font-medium text-3xl mt-4">
            Kelola Complaint / Detail
          </h1>

          {/* Panel */}
          <section className="flex w-full flex-col">
            {/* Panel */}
            <section className="flex md:flex-row flex-col gap-3 mt-5 w-full">
              <div className="font-poppins bg-[#E6E0E9] rounded-lg px-4 py-1 pr-20">
                <p>Nomor Aduan</p>
                <p>{complaint.id}</p>
              </div>
              <div className="font-poppins bg-white border border-gray-300 rounded-lg px-4 py-2 flex justify-center items-center">
                <button className="text-main-darker" onClick={handleOpenModal}>
                  {complaint.status}
                </button>
              </div>
              <button
                className="bg-[#EA1212] text-white py-2 px-6 rounded-lg"
                onClick={() => handleDeleteComplaint(complaint.id)}
              >
                Hapus
              </button>
            </section>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="bg-white p-8 rounded-lg w-[500px]">
                  <h2 className="text-xl font-bold mb-4">Status</h2>
                  <div className="mb-4">
                    <label htmlFor="progress" className="block mb-1 font-bold">
                      Status Verifikasi
                    </label>
                    <select
                      id="progress"
                      value={selectedOption}
                      onChange={handleSelectChange}
                      className="w-full border border-gray-300 rounded p-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Verifikasi">Verifikasi</option>
                      <option value="On Progress">On Progress</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block mb-1 font-bold">
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={textInput}
                      onChange={handleTextInputChange}
                      className="w-full border border-gray-300 rounded p-2"
                      placeholder="Enter description..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handleStatusUpdate}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Content */}
          <section className="flex flex-col lg:flex-row mt-16 w-full gap-4">
            <Content complaint={complaint} />
          </section>

          {/* Diskusi & Progress */}
          <section className="flex flex-col lg:flex-row gap-4 mt-6 w-full">
            <ProsesAduan complaintId={id} refreshProcess={refreshProcess} />
            <DiskusiAduan discussions={discussions} complaint={complaint} />
          </section>
        </main>
      </div>
    </section>
  );
};

export default DetailComplaintLayout;
