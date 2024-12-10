import { useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';

export default function DetailCardNews() {
  const detailNews = useSelector((state) => state.news.detailNews); 
  if (!detailNews) { // Jika detailNews belum ada (masih loading)
    return (
      <div className="px-6 py-5 bg-neutral-50 rounded-2xl flex-col justify-start items-start gap-5 inline-flex lg:w-6/12 mb-5">
        <div className="flex-col justify-start items-start gap-2.5 flex">
          <Skeleton shape="rectangle" width="100%" height="294px" className="rounded-lg shadow" />
        </div>
        <div className="flex-col justify-start items-start gap-2.5 flex">
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <Skeleton width="60%" height="2rem" />
            <Skeleton width="100%" height="1.5rem" />
          </div>
          <div className="flex justify-between items-center w-full">
            <Skeleton width="20%" height="1rem" />
            <Skeleton width="20%" height="1rem" />
          </div>
        </div>
      </div>
    ); // Menampilkan skeleton saat data masih di-fetch
  }

  return (
    <div className="px-6 py-5 bg-neutral-50 rounded-2xl flex-col justify-start items-start gap-5 inline-flex lg:w-6/12 mb-5">
      <div className="flex-col justify-start items-start gap-2.5 flex">
        <img
          className="rounded-lg shadow"
          src={`http://localhost:8000/${
            detailNews.files && detailNews.files.length > 0
              ? detailNews.files[0].path
              : "default.jpg"
          }`}
          alt={detailNews.title}
        />
        <div className="flex items-start gap-2">
          <div className="text-black text-base font-bold font-poppins leading-none">
            {detailNews.title}
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.25052 8.28028C2.27976 5.42838 4.54537 3 7.45736 3C9.24474 3 10.5595 3.88475 11.3985 4.71777C11.6321 4.94972 11.8326 5.18108 12.0005 5.39441C12.1684 5.18108 12.3688 4.94972 12.6024 4.71777C13.4415 3.88475 14.7562 3 16.5436 3C19.4556 3 21.7212 5.42838 21.7504 8.28028L21.7504 8.28049C21.8059 13.8427 17.3366 17.6908 12.8442 20.7403C12.5954 20.9095 12.3014 21.0001 12.0005 21.0001C11.6995 21.0001 11.4056 20.9095 11.1567 20.7403C6.66392 17.6908 2.19456 13.8427 2.25052 8.28042L2.25052 8.28028ZM12.6704 7.08725C12.543 7.34027 12.2839 7.5 12.0005 7.5C11.7171 7.5 11.458 7.34029 11.3306 7.08729C11.3304 7.08698 11.3301 7.08638 11.3297 7.0855C11.3288 7.08372 11.3273 7.08081 11.3251 7.0768C11.324 7.07467 11.3227 7.07223 11.3213 7.0695C11.3128 7.0537 11.2988 7.02796 11.2792 6.9937C11.2399 6.92508 11.1786 6.82288 11.0952 6.69831C10.9277 6.44793 10.676 6.11413 10.3417 5.78223C9.6699 5.11525 8.71309 4.5 7.45736 4.5C5.42314 4.5 3.7719 6.20966 3.75044 8.29551M12.6704 7.08725C12.6705 7.08694 12.6708 7.08635 12.6713 7.0855C12.6727 7.08278 12.6755 7.07739 12.6797 7.0695C12.6881 7.0537 12.7022 7.02796 12.7218 6.9937C12.7611 6.92508 12.8224 6.82288 12.9058 6.69831C13.0733 6.44793 13.325 6.11413 13.6593 5.78223C14.3311 5.11525 15.2879 4.5 16.5436 4.5C18.5778 4.5 20.229 6.20963 20.2505 8.29545C20.2972 12.9826 16.5329 16.4235 12.0011 19.4996L12.0005 19.5001L11.9998 19.4996C7.46758 16.4235 3.70336 12.9827 3.75044 8.29566"
              fill="#1A1A1A"
            />
          </svg>
          <span className="text-black text-base font-medium font-montserrat leading-7">
            {detailNews.total_likes}
          </span>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-2.5 flex">
        <div className="text-stone-950 text-base font-normal font-poppins leading-none">
          {detailNews.content}
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="text-center text-gray-400 text-xs font-normal font-montserrat leading-none">
            {detailNews.admin.name}
          </div>
          <div className="text-center text-gray-400 text-xs font-normal font-montserrat leading-none">
            {detailNews.updated_at}
          </div>
        </div>
      </div>
    </div>
  );
}

