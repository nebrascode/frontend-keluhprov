import CardProgress from "./CardProgress";

const Progress = ({ progressData }) => {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap justify-center w-full gap-4">
      {progressData && (
        <>
          <CardProgress
            number={progressData.Pending || 0}
            text="Laporan Diterima"
            icon="/images/laporan-diterima.svg"
            backgroundImage="/images/awan-akatsuki.png"
          />
          <CardProgress
            number={progressData.Verifikasi || 0}
            text="Terverifikasi"
            icon="/images/terverifikasi.svg"
            backgroundImage="/images/awan-akatsuki.png"
          />
          <CardProgress
            number={progressData["On Progress"] || 0}
            text="Sedang Diproses"
            icon="/images/detail-laporan.svg"
            backgroundImage="/images/awan-akatsuki.png"
          />
          <CardProgress
            number={progressData.Selesai || 0}
            text="Laporan Selesai"
            icon="/images/laporan-selesai.svg"
            backgroundImage="/images/awan-akatsuki.png"
          />
        </>
      )}
    </div>
  );
};

export default Progress;
