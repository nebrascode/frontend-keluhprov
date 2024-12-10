/* eslint-disable react/prop-types */
import { useState } from "react";

export default function DataRow({ data, onUpdate, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: data.name,
        email: data.email,
        job: data.job,
        start_date: data.start_date,
        end_date: data.end_date,
        status: data.status,
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData); // Fungsi callback untuk memperbarui data
        setShowModal(false); // Tutup modal setelah update
    };

    const handleDelete = () => {
        onDelete(data.id); // Fungsi callback untuk menghapus data berdasarkan ID
        setShowDeleteModal(false); // Menutup modal konfirmasi setelah data dihapus
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
                            setShowDeleteModal(true); // Menampilkan modal konfirmasi hapus
                        }}
                        className="btn btn-sm bg-transparent"
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>

            {/* Modal Update */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Update Data</h3>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Job</label>
                                <input
                                    type="text"
                                    name="job"
                                    value={formData.job}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">End Date</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
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
                                className="btn btn-danger"
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
