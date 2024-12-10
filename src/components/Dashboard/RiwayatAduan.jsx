const RiwayatAduan = ({ data }) => {
  const sortedData = data
    .sort((a, b) => new Date(b.complaint.date) - new Date(a.complaint.date))
    .slice(0, 3);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-dark-3"
      case "Verifikasi":
        return "bg-info-3";
      case "On Progress":
        return "bg-main-color";
      case "Selesai":
        return "bg-success-3"
      case "Ditolak":
        return "bg-error-3"
      default:
        return "bg-light-3";
    }
  };

  return (
    <div className="bg-main-lighter p-4 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Riwayat Aduan</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-main-color text-black">
            <tr>
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">Nama</th>
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Kategori</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="bg-main-lighter text-black text-center">
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{item.user.name}</td>
                <td className="py-2 px-4">
                  {new Date(item.complaint.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  {new Date(item.complaint.date).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td className="py-3 px-4 flex items-center justify-center">
                  <span className="bg-[#FEF7FF] text-[#49454F] font-poppins font-medium py-3 px-4 rounded-lg min-w-36">
                    {item.category.name}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`font-poppins font-medium py-3 px-4 rounded-lg text-light-4  ${getStatusColor(
                      item.complaint.status
                    )}`}
                  >
                    {item.complaint.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwayatAduan;
