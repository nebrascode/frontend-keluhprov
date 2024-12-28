import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddDataSchedule = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");

    // Fungsi untuk konversi format tanggal ke DD/MM/YYYY
    const formatDateToDDMMYYYY = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, "0"); // Hari (2 digit)
        const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Bulan (2 digit)
        const year = d.getFullYear(); // Tahun (4 digit)
        return `${day}/${month}/${year}`; // Gabungkan dalam format DD/MM/YYYY
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        //validasi form
        if (!name || !email || !job || !startDate || !endDate || !status) {
            alert("Form harus diisi semua!");
            return;
        }

        // Konversi tanggal sebelum dikirim ke server
        const formattedStartDate = formatDateToDDMMYYYY(startDate);
        const formattedEndDate = formatDateToDDMMYYYY(endDate);

        //membuat form data untuk dikirim ke api
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('job', job);
        formData.append('start_date', formattedStartDate);
        formData.append('end_date', formattedEndDate);
        formData.append('status', status);

        try {
            const token = sessionStorage.getItem("token");

            // Mengirim data ke API
            await axios.post("http://localhost:8000/api/v1/schedules", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            //mengosongkan form
            setName("");
            setEmail("");
            setJob("");
            setStartDate("");
            setEndDate("");
            setStatus("");

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil menambahkan data",
                showConfirmButton: false,
                timer: 1500,
            });

            //menutup modal
            onClose();
            window.location.reload();
            
        } catch (error) {
            console.error("Error:", error.message);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Gagal menyimpan data",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Data</h3>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Job</label>
                        <input
                            type="text"
                            name="job"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Start Date</label>
                        <input
                            type="date"
                            name="start_date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}  // Menangani perubahan input
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">End Date</label>
                        <input
                            type="date"
                            name="end_date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}  // Menangani perubahan input
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn bg-info-3 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDataSchedule;

