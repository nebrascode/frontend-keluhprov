import DataRow from "./DataRow";
import { useState, useEffect } from "react";
import axios from "axios";
import AddDataSchedule from "./formAddData";
import Swal from "sweetalert2";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";


export default function DataTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");

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

    const filteredData = statusFilter === "All" ? data : data.filter((item) => item.status === statusFilter);

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
                showConfirmButton:false,
                timer: 1500,
            })
        } catch (error) {
            console.error("Error deleting data:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete data.",
                icon: "error",
                showConfirmButton:false,
                timer: 1500,
            })
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-2 px-3"> {/* Added div for better layout */}
                <button
                    className="bg-main-color hover:bg-main-darker rounded px-5 py-1 ml-3"
                    onClick={handleClick}
                >
                    <i className="fa fa-plus mr-1"></i> Add
                </button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="bg-main-color hover:bg-main-darker rounded px-5 py-1">
                            <i className="fa fa-filter mr-2 "></i>
                            Filter by Status: {statusFilter}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                        <DropdownMenuItem onClick={() => setStatusFilter("All")} className="hover:bg-main-lighter">All</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter("Pending")} className="hover:bg-main-lighter">Pending</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter("Doing")} className="hover:bg-main-lighter">Doing</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter("Done")} className="hover:bg-main-lighter">Done</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div> {/* End of added div */}
            <div className="mt-2 bg-white rounded-md shadow-lg w-full">
                <div className="overflow-x-auto">
                    {/* Modal Tambah Data */}
                    {showModal && <AddDataSchedule onClose={handleCloseModal} />}
                    <table className="table">
                        <thead>
                            <tr className="font-poppins font-light">
                                <th ><i className="fa fa-tasks text-warning-3 text-xl mr-2" aria-hidden="true"></i>Job</th>
                                <th ><i className="fa fa-user text-warning-3 text-xl mr-2" aria-hidden="true"></i>Name</th>
                                <th><i className="fa fa-calendar-check text-warning-3 text-xl mr-2" aria-hidden="true"></i>Start Date</th>
                                <th><i className="fa fa-calendar-times text-warning-3 text-xl mr-2" aria-hidden="true"></i>End Date</th>
                                <th><i className="fa fa-spinner text-warning-3 text-xl mr-2" aria-hidden="true"></i>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((item) => (
                                <DataRow key={item.id} data={item} onDelete={handleDelete} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
