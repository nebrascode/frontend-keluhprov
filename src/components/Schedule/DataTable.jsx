import DataRow from "./DataRow";
import { useState, useEffect } from "react";
import axios from "axios";
import AddDataSchedule from "./formAddData";

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
                    "http://localhost:8000/api/v1/schedules", // URL API untuk jadwal
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data) {
                    setData(response.data); // Menyimpan data yang diterima dari API
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
                    {showModal && (
                        <AddDataSchedule
                            onClose={handleCloseModal}/>
                    )}
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="flex items-center">
                                    <i className="fa fa-tasks text-3xl mr-3 text-main-darker"></i>Job
                                </th>
                                <th>
                                    <i className="fa fa-user text-3xl mr-3 text-main-darker"></i>Name
                                </th>
                                <th>
                                    <i className="fa fa-hourglass-start text-3xl mr-3 text-main-darker"></i>
                                    Start
                                </th>
                                <th>
                                    <i className="fa fa-hourglass-end text-3xl mr-3 text-main-darker"></i>End
                                </th>
                                <th>
                                    <i className="fa fa-spinner text-3xl mr-3 text-main-darker"></i> Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <DataRow key={item.id} data={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
