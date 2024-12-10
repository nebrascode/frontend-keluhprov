import { FaInstagram, FaFacebook, FaWhatsapp, FaHeadset, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import logo3 from '../../assets/logo-3.png';
import logo2 from "../../assets/logo-2.png";
import redDots from '../../assets/red-dots.png';

function Footer() {
    return (
        <div className="bg-main-color w-full flex flex-col md:flex-row gap-8 md:gap-12 p-6 md:p-10 relative">
            <div className="flex flex-col items-start md:w-1/3">
                <div className="w-44 h-36 bg-neutral-50 rounded-r-[70px] flex justify-start ps-2 items-center relative">
                    <img src={logo2} alt="logo" className="absolute top-2 left-4 w-40" />
                </div>
                <div className="mt-4 ml-0 md:ml-4">
                    <h1 className="text-neutral-900 text-2xl font-bold font-poppins mb-4">Keluh Prov</h1>
                    <p className="text-neutral-900 text-base font-poppins leading-relaxed">Keluh Provinsi adalah aplikasi/website aduan masyarakat kepada pemerintah terkait masalah yang ada dimasyarakat, seperti layanan publik, fasilitas publik, dan lainnya</p>
                </div>
            </div>

            <div className="md:w-1/3 mt-8 md:mt-16 ml-20">
                <h1 className="text-neutral-900 text-2xl font-bold font-poppins mb-4">Kanal Aduan</h1>
                <div className="flex items-center mb-4 gap-2">
                    <FaInstagram className="text-neutral-900 text-2xl" />
                    <a href="#" className="text-neutral-900 text-lg font-poppins">Keluh Provinsi</a>
                </div>
                <div className="flex items-center mb-4 gap-2">
                    <FaFacebook className="text-neutral-900 text-2xl" />
                    <a href="#" className="text-neutral-900 text-lg font-poppins">@keluhprovinsi</a>
                </div>
                <div className="flex items-center mb-4 gap-2">
                    <FaXTwitter className="text-neutral-900 text-2xl" />
                    <a href="#" className="text-neutral-900 text-lg font-poppins">@keluh_provinsi</a>
                </div>
                <div className="flex items-center mb-4 gap-2">
                    <FaWhatsapp className="text-neutral-900 text-2xl" />
                    <a href="#" className="text-neutral-900 text-lg font-poppins">0813-1412-4242</a>
                </div>
            </div>

            <div className="md:w-1/3 mt-8 md:mt-16">
                <h1 className="text-neutral-900 text-2xl font-bold font-poppins mb-4">Kontak Kami</h1>
                <div className="flex items-center mb-4 gap-2">
                    <img src={logo3} alt="logo" className="w-6 h-6" />
                    <div className="text-neutral-900 text-lg font-poppins">keluhprovinsi.go.id</div>
                </div>
                <div className="flex items-center mb-4 gap-2">
                    <FaHeadset className="text-neutral-900 text-2xl" />
                    <a href="#" className="text-neutral-900 text-lg font-poppins">(022) 8214-2144</a>
                </div>
                <div className="flex items-center mb-4 gap-2">
                    <FaMapMarkerAlt className="text-neutral-900 text-2xl" />
                    <a href="#" className="text-neutral-900 text-lg font-poppins leading-tight">Jl. Garuda No.7, Ademsari, Semarang<br />Gula Jawa 12345</a>
                </div>
                <img src={redDots} alt="pattern" className="absolute right-0 bottom-0 w-12 h-12 md:w-24 md:h-24" />
            </div>
        </div>
    );
}

export default Footer;
