/* eslint-disable react/prop-types */
import { useState } from "react";
import EditSchedule from "./formEdit";

export default function DataRow({ data }) {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleOpenModal = () => {
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "badge-error"; // Warna merah
            case "Doing":
                return "badge-info"; // Warna biru
            case "Done":
                return "badge-success"; // Warna hijau
            default:
                return "badge-neutral"; // Warna default
        }
    };

    return (
        <>
            {/* Tabel baris */}
            <tr
                className="transition duration-300 ease-in-out hover:bg-main-lighter cursor-pointer"
                onClick={handleOpenModal}
            >
                <td>
                    <span>{data.job}</span>
                </td>
                <td>
                    <div className="flex items-center gap-3">
                        <div>
                            <div className="badge badge-neutral badge-md">{data.name}</div>
                            <div className="text-xs opacity-50">{data.email}</div>
                        </div>
                    </div>
                </td>
                <td>{data.start_date}</td>
                <td>{data.end_date}</td>
                <td>
                    <span className={`badge badge-md ${getStatusColor(data.status)}`}>{data.status}</span>
                </td>
                <td>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Mencegah trigger modal edit saat menghapus
                            // setShowDeleteModal(true)
                        }}
                        className="btn btn-sm bg-transparent"
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>

            {/* Modal Update */}
            {showEditModal && (
                <EditSchedule id={data.id} onClose={handleCloseModal}/>
            )}

            {/* Modal Konfirmasi Hapus */}
            {/* {showDeleteModal && (
               <></>
            )} */}
        </>
    );
}
