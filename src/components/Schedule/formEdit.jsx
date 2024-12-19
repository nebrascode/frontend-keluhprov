import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditSchedule = ({ id,onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");

    const formatDateToDDMMYYYY = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, "0"); // Hari (2 digit)
        const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Bulan (2 digit)
        const year = d.getFullYear(); // Tahun (4 digit)
        return `${day}/${month}/${year}`; // Gabungkan dalam format DD/MM/YYYY
    };

    useEffect(() => {
        if (id) fetchScheduleById();
    }, [id]);

    const fetchScheduleById = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`http://localhost:8000/api/v1/schedules/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = response.data;
            setName(data.name);
            setEmail(data.email);
            setJob(data.job);
            setStartDate(data.start_date);
            setEndDate(data.end_date);
            setStatus(data.status);
        } catch (error) {
            console.error("Error fetching schedule:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Gagal memuat data untuk diedit.",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         // Konversi tanggal sebelum dikirim ke server
         const formattedStartDate = formatDateToDDMMYYYY(startDate);
         const formattedEndDate = formatDateToDDMMYYYY(endDate);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("job", job);
        formData.append("start_date", formattedStartDate);
        formData.append("end_date", formattedEndDate);
        formData.append("status", status);

        try {
            const token = sessionStorage.getItem("token");
            await axios.put(`http://localhost:8000/api/v1/schedules/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Berhasil mengupdate schedule",
                showConfirmButton: false,
                timer: 1500,
            });

            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error updating schedule:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Gagal memperbarui schedule.",
            });
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Schedule</h3>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Job</label>
                        <input
                            type="text"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
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
                        <button type="button" onClick={onClose} className="btn">
                            Cancel
                        </button>
                        <button type="submit" className="btn bg-info-3 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSchedule;
