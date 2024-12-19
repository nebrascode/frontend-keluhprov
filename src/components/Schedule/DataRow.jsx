/* eslint-disable react/prop-types */
import { useState } from "react";
import EditSchedule from "./formEdit";

export default function DataRow({ data, onDelete }) {
    const [ showEditModal, setShowEditModal ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "badge-error"; // Merah
            case "Doing":
                return "badge-info"; // Biru
            case "Done":
                return "badge-success"; // Hijau
            default:
                return "badge-neutral"; // Default
        }
    };

    const handleDelete = () => {
        onDelete(data.id); // Memanggil fungsi onDelete yang diterima dari DataTable
        setShowDeleteModal(false); // Menutup modal delete
    };

    return (
        <>
            {/* Tabel Baris */}
            <tr
                className="transition duration-300 ease-in-out hover:bg-main-lighter cursor-pointer"
                onClick={handleOpenEditModal}
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
                            e.stopPropagation(); // Menghindari trigger modal edit
                            setShowDeleteModal(true); // Membuka modal delete
                        }}
                        className="btn btn-sm text-error-3"
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>

            {/* Modal Edit */}
            {showEditModal && <EditSchedule id={data.id} onClose={handleCloseEditModal} />}

            {/* Modal Konfirmasi Hapus */}
            {showDeleteModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure you want to delete this data?</h3>
                        <div className="modal-action">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="btn"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="btn btn-error"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
