/* eslint-disable react/prop-types */

const TampilBuktiSelesai = ({ buktiSelesai, loading, error, onDelete }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <><div className="bg-main-color p-4 rounded-md mb-0">
            <p className="text-md font-bold font-poppins">Bukti Penyelesaian</p>
        </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                {buktiSelesai.length === 0 ? (
                    <p className="text-gray-500">Belum ada bukti penyelesaian.</p>
                ) : (
                    buktiSelesai.map((bukti, index) => (
                        <div key={bukti.id} className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <img
                                    src={`http://localhost:8000/${bukti.path}`} // Sesuaikan dengan URL API yang mengembalikan path gambar
                                    alt={`Bukti ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-md border"
                                />
                            </div>
                            <div className="bg-white p-5 rounded-lg">
                                <p className="">Nama Penanggung Jawab: {bukti.penanggung_jawab}</p>
                                <p className="">Tanggal Penyelesaian: {new Date(bukti.finished_on).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <button className="btn btn-sm text-error-3" onClick={()=>onDelete(bukti.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div></>
    );
};

export default TampilBuktiSelesai;
