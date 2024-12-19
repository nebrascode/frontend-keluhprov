/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const FormUploadBukti = ({ complaintId, onClose }) => {
    const [ path, setPath ] = useState(null);
    const [ penanggungJawab, setPenanggungJawab ] = useState("");
    const [ finishedOn, setFinishedOn ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi input
        if (!path || !penanggungJawab || !finishedOn) {
            alert("Form harus diisi semua!");
            return;
        }

        // Membuat FormData untuk pengiriman
        const formData = new FormData();
        formData.append("path", path);
        formData.append("penanggung_jawab", penanggungJawab);
        formData.append("finished_on", finishedOn);
        formData.append("complaint_id", complaintId);

        setLoading(true);
        setError(null);

        try {
            // Mengambil token dari sessionStorage
            const token = sessionStorage.getItem("token");

            // Mengirim data ke API
            await axios.post("http://localhost:8000/api/v1/unggah-bukti", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            setPath("");
            setPenanggungJawab("");
            setFinishedOn("");

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Upload bukti selesai",
                showConfirmButton: true,
                timer: 1500,
            });
            onClose(); // Menutup form
            window.location.reload(); // Memuat ulang halaman

        } catch (error) {
            setError(error.response?.data?.message || "Gagal mengunggah bukti.");
            console.error("Error:", error.message);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
                <h2 className="text-xl font-semibold mb-4">Unggah Bukti Penyelesaian</h2>
                {error && <p className="text-red-500 text-sm font-medium mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="path">
                            Upload Gambar
                        </label>
                        <input
                            type="file"
                            id="path"
                            onChange={(e) => setPath(e.target.files[ 0 ])}
                            accept="image/jpeg, image/jpg"
                            className="border rounded-md w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="penanggungJawab">
                            Nama Penanggung Jawab
                        </label>
                        <input
                            type="text"
                            id="penanggungJawab"
                            value={penanggungJawab}
                            onChange={(e) => setPenanggungJawab(e.target.value)}
                            className="border rounded-md w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="finishedOn">
                            Tanggal Aduan Diselesaikan
                        </label>
                        <input
                            type="date"
                            id="finishedOn"
                            value={finishedOn}
                            onChange={(e) => setFinishedOn(e.target.value)}
                            className="border rounded-md w-full p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded-md"
                            disabled={loading}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-md text-white ${loading ? "bg-gray-400" : "bg-blue-500"
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Mengunggah..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormUploadBukti;
