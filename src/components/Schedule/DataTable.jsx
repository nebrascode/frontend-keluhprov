import DataRow from "./DataRow";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DataTable() {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ showModal, setShowModal ] = useState(false);
    const [ newData, setNewData ] = useState({
        name: "",
        email: "",
        job: "",
        start_date: "",
        end_date: "",
        status: "Pending",
    });

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
        setNewData({
            name: "",
            email: "",
            job: "",
            start_date: "",
            end_date: "",
            status: "Pending",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
            ...prevData,
            [ name ]: value,
        }));
    };

    const handleAddData = async (e) => {
        e.preventDefault();

        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:8000/api/v1/schedules", // Endpoint untuk menyimpan data baru
                newData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data) {
                setData((prevData) => [ ...prevData, response.data ]); // Menambahkan data baru ke state
                handleCloseModal(); // Menutup modal setelah berhasil menyimpan
            }
        } catch (err) {
            setError("Gagal menyimpan data.");
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
                    {showModal && (
                        <div className="modal modal-open">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Add New Data</h3>
                                <form onSubmit={handleAddData} className="space-y-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newData.name}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newData.email}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Job</label>
                                        <input
                                            type="text"
                                            name="job"
                                            value={newData.job}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Start Date</label>
                                        <input
                                            type="date"
                                            name="start_date"
                                            value={newData.start_date}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">End Date</label>
                                        <input
                                            type="date"
                                            name="end_date"
                                            value={newData.end_date}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Status</label>
                                        <select
                                            name="status"
                                            value={newData.status}
                                            onChange={handleInputChange}
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
                                            onClick={handleCloseModal}
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
