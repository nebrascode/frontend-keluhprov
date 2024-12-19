import DataRow from "./DataRow";
import { useState, useEffect } from "react";
import axios from "axios";
import AddDataSchedule from "./formAddData";
import Swal from "sweetalert2";

export default function DataTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:8000/api/v1/schedules", // URL API jadwal
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data) {
                    setData(response.data);
                }
            } catch (err) {
                setError("Gagal memuat data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Fungsi untuk menghapus data berdasarkan ID
    const handleDelete = async (id) => {
        try {
            const token = sessionStorage.getItem("token");
            await axios.delete(`http://localhost:8000/api/v1/schedules/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData((prevData) => prevData.filter((item) => item.id !== id));
            Swal.fire({
                title:"Successfully",
                text: "Berhasil menghapus data",
                icon:"success",
                showConfirmButton:false
            })
        } catch (error) {
            console.error("Error deleting data:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete data.",
                icon: "error",
                showConfirmButton:false
            })
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="mt-4">
            <button
                className="bg-main-color hover:bg-main-darker rounded px-5 py-1 ml-3"
                onClick={handleClick}
            >
                <i className="fa fa-plus mr-1"></i> Add
            </button>
            <div className="mt-2 bg-white rounded-md shadow-lg w-full">
                <div className="overflow-x-auto">
                    {/* Modal Tambah Data */}
                    {showModal && <AddDataSchedule onClose={handleCloseModal} />}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Job</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <DataRow key={item.id} data={item} onDelete={handleDelete} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
