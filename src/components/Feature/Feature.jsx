import logo from '../../assets/bel.png';
import logo2 from '../../assets/chat.png';
import logo3 from '../../assets/map.png';
import logo4 from '../../assets/share.png';
import iphone from '../../assets/hp-feature2.png';
import redDots from '../../assets/titik2.png';

export default function Features() {
  return (
    <div className="lg:h-[750px] bg-main-color flex flex-col lg:flex-row justify-between p-4 lg:pe-14 relative" id="features">
      {/* Background SVG */}
      <div className="absolute inset-0 lg:pl-96 lg:hidden hidden">
        <svg width="979" height="740" viewBox="0 0 979 740" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_302_1488)">
            <path
              d="M252.93 -5L195.095 91.8818L163.953 -5L131.142 55.9418L100 39.5344V136.416L148.938 221.578L229.574 314.554L252.93 362.995C252.93 411.436 248.259 526.131 229.574 597.386C206.217 686.455 229.574 702.862 229.574 739.584C229.574 768.961 298.902 819.016 333.566 840.372L413.646 784.118L474.262 739.584H540.44L615.514 784.118H767.889L811.265 678.642L889.121 702.862L917.483 808.339L1081.54 881L1317.88 784.118H1562.57L1714.95 739.584L1770 702.862L1735.52 565.353L1689.36 415.342L1677.69 270.019L1645.99 201.265L1562.57 112.196L1441.89 39.5344H1317.88L1202.77 201.265L1124.91 455.97L1015.36 508.317C1011.65 482.795 1001.9 425.343 992.557 399.716C983.215 374.089 967.532 389.038 960.859 399.716V270.019L871.881 136.416H811.265L767.889 39.5344L664.452 91.8818L615.514 -5H488.721L388.065 19.2205L252.93 -5Z"
              fill="#FEE55D"
              fill-opacity="0.71"
            />
          </g>
          <defs>
            <filter id="filter0_f_302_1488" x="0" y="-105" width="1870" height="1086" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_302_1488" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative flex flex-col lg:flex-row justify-start w-full lg:w-4/10 gap-8 lg:gap-24 pl-4 lg:pl-12 pr-4 lg:pr-20 z-50">
        <div className="flex flex-col items-center lg:items-start">
          <div className="text-center lg:text-justify text-zinc-900 text-xl lg:text-2xl font-bold font-montserrat leading-normal lg:pt-8 z">Efisiensi dan Transparansi</div>
          <div className="text-center lg:text-justify text-zinc-900 text-base lg:text-lg font-semibold font-montserrat leading-normal pt-2">Solusi Digital untuk Masyarakat yang Lebih Responsif</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-5 lg:pt-10">
            <div className="flex flex-col items-center lg:items-start">
              <img src={logo} alt="image" className="w-30 h-16 mx-auto lg:mx-0" />
              <div className="text-center lg:text-justify text-zinc-800 text-base lg:text-xl font-bold font-montserrat leading-normal pt-4">Notifikasi Langsung</div>
              <p className="font-montserrat text-center lg:text-left text-sm lg:text-lg px-4 lg:px-0">Tetap terinformasi secara instan dengan pembaruan real-time tentang keluhan Anda.</p>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <img src={logo3} alt="image" className="w-30 h-16 mx-auto lg:mx-0" />
              <div className="text-center lg:text-justify text-zinc-800 text-base lg:text-xl font-bold font-montserrat leading-normal pt-4">Peta Interaktif</div>
              <p className="font-montserrat text-center lg:text-left text-sm lg:text-lg px-4 lg:px-0">peta interaktif untuk melacak masalah di wilayah Anda atau melihat tren.</p>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <img src={logo4} alt="image" className="w-30 h-16 mx-auto lg:mx-0" />
              <div className="text-center lg:text-justify text-zinc-800 text-base lg:text-xl font-bold font-montserrat leading-normal pt-4">Sosial Media</div>
              <p className="font-montserrat text-center lg:text-left text-sm lg:text-lg px-4 lg:px-0">Bagikan pengalaman Anda dengan lancar di platform media sosial.</p>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <img src={logo2} alt="image" className="w-30 h-16 mx-auto lg:mx-0" />
              <div className="text-center lg:text-justify text-zinc-800 text-base lg:text-xl font-bold font-montserrat leading-normal pt-4">Umpan Balik</div>
              <p className="font-montserrat text-center lg:text-left text-sm lg:text-lg px-4 lg:px-0">saluran komunikasi terbuka untuk memberikan umpan balik atas keluhan Anda.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Mockups */}
      <img src={redDots} alt="pattern" className="absolute right-0 top-0" />
      <img src={redDots} alt="pattern" className="absolute right-0 bottom-0" />
      <div className="relative flex justify-center lg:justify-start w-full lg:w-6/10 pl-0 lg:pl-20 ml-auto">
        <img src={iphone} alt="image" className="w-full h-auto lg:h-[680px] mt-10 pb-20" />
      </div>
    </div>
  );
}
