import logo from '../../assets/logo.png';
import iphoneImage from '../../assets/hero/iphone-image.png'
import appleLogo from '../../assets/hero/appleLogo.svg'
import googlePlay from '../../assets/hero/googlePlay.svg'

export default function Hero() {
    return (
        <div className="h-[670px] sm:h-[800px] bg-main-darker flex flex-col md:flex-row justify-between lg:ps-20 relative" id="home">
            {/* Background SVG */}
            <div className="absolute inset-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1475 752" fill="none">
                    <g filter="url(#filter0_f_302_833)">
                        <path d="M68.5421 30L11.988 101.841L-18.4642 30L-50.5478 75.1905L-81 63.0238V134.865L-33.1465 198.016L45.703 266.96L68.5421 302.881C68.5421 338.802 63.9743 423.852 45.703 476.69C22.8638 542.738 45.703 554.905 45.703 582.135C45.703 603.919 113.495 641.037 147.392 656.873L225.697 615.159L284.97 582.135H349.681L423.093 615.159H572.091L614.507 536.944L690.637 554.905L718.371 633.119L878.789 687L1109.9 615.159H1349.17L1498.16 582.135L1552 554.905L1518.29 452.936L1473.15 341.698L1461.73 233.937L1430.73 182.952L1349.17 116.905L1231.16 63.0238H1109.9L997.335 182.952L921.204 371.825L814.078 410.643C810.452 391.717 800.918 349.114 791.782 330.111C782.647 311.108 767.312 322.193 760.786 330.111V233.937L673.78 134.865H614.507L572.091 63.0238L470.946 101.841L423.093 30H299.109L200.683 47.9603L68.5421 30Z" fill="#FEE55D" fillOpacity="0.71" />
                    </g>
                    <defs>
                        <filter id="filter0_f_302_833" x="-181" y="-70" width="1833" height="857" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_302_833" />
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* Content */}
            <div className="relative flex flex-col px-8 py-6 md:flex-row justify-start items-center md:w-[578px] gap-44">
                <div className="flex flex-col">
                    <img className="h-7 w-36  md:w-96 md:h-20 mb-7" src={logo} alt="KeluhProv Logo" />
                    <div className="text-justify text-zinc-900 text-sm md:text-xl font-semibold font-['Montserrat'] leading-normal">
                        KeluhProv adalah aplikasi untuk melaporkan keluhan masyarakat di Provinsi Banten. Dengan antarmuka yang mudah digunakan, penduduk bisa dengan cepat mengirimkan keluhan mereka tentang infrastruktur, layanan publik, atau masalah lingkungan. Aplikasi ini memudahkan pelacakan status keluhan dan membantu pemerintah memperbaiki layanan publik.
                    </div>
                    <div className="flex gap-4 mt-7">
                        <button className='flex gap-2.5 bg-main-lighter py-1 px-6 justify-center items-center rounded-3xl border border-main-darker hover:bg-main-darker'>
                            <img src={appleLogo} alt="appstore" />
                            App Store
                        </button>
                        <button className='flex gap-2.5 bg-main-lighter py-1 px-6 justify-center items-center rounded-3xl border border-main-darker hover:bg-main-darker'>
                            <img src={googlePlay} alt="googleplay" />
                            Goole Play
                        </button>
                    </div>
                </div>
            </div>

            {/* Phone Mockups */}
            <div className="relative mb-0 mt-auto flex justify-center">
                <img src={iphoneImage} alt="image" className='w-auto h-[300px] lg:w-[568px] lg:h-[615px]'/>
            </div>
        </div>
    );
}