import testi1 from '../../assets/testimoni1.png';
import testi2 from '../../assets/testimoni2.png';
import testi3 from '../../assets/testimoni3.png';
import slide from '../../assets/slide.png';


export default function Testimoni() {
  return (
    <div
      className="h-auto lg:h-[750px] bg-white flex flex-col justify-center items-center lg:pe-20 lg:pl-24 lg:pb-20 relative pt-10"
      id="testimoni"
    >
      {/* Phone Mockups */}
      <div className="z-10 flex items-center justify-between w-full px-4 lg:px-20">
        <button className="btn btn-square bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="text-zinc-900 text-xl lg:text-2xl font-bold font-montserrat leading-normal">
          Apa yang klien kami katakan tentang kami
        </div>
        <button className="btn btn-square bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* slide */}
      <div className="pt-4 lg:pt-8 pl-3">
        <img src={slide} alt="image" className="w-full h-auto" />
      </div>

      {/* Testimoni */}
      <div className="hidden lg:flex justify-center gap-4 pt-5">
        <div className="flex justify-center">
          <img
            src={testi1}
            alt="image"
            className="w-20 h-20 lg:w-auto lg:h-auto"
          />
        </div>
        <div className="flex justify-center">
          <img
            src={testi2}
            alt="image"
            className="w-20 h-20 lg:w-auto lg:h-auto"
          />
        </div>
        <div className="flex justify-center">
          <img
            src={testi3}
            alt="image"
            className="w-20 h-20 lg:w-auto lg:h-auto"
          />
        </div>
      </div>

      {/* Testimoni saat responsif */}
      <div className="lg:hidden flex flex-wrap justify-center items-center pt-5 gap-4 mb-5">
        <div className="flex justify-center">
          <img src={testi1} alt="image" className="w-40 h-40 lg:w-20 lg:h-20" />
        </div>
        <div className="flex justify-center">
          <img src={testi2} alt="image" className="w-40 h-40 lg:w-20 lg:h-20" />
        </div>
      </div>
    </div>
  );
}
