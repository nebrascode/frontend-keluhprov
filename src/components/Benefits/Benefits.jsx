import logo from '../../assets/logo2.png';
import logo2 from '../../assets/logo3.png';
import logo3 from '../../assets/logo4.png';
import logo4 from '../../assets/logo5.png';
import iphoneImage from '../../assets/gambar-titik.png';

const Benefits = () => {
  return (
    <div className="lg:h-[750px] bg-white flex flex-col lg:flex-row justify-between p-6 lg:ps-16 lg:pe-20 relative" id="benefit">
      {/* Phone Mockups */}
      <div className="relative mb-10 lg:mb-0 mt-auto flex justify-center lg:justify-start">
        <img src={iphoneImage} alt="image" className="w-full lg:w-[600px] h-auto lg:h-[670px] max-w-full pb-6 lg:pb-16  mr-0 lg:mr-10" />
      </div>
  
      {/* Content */}
      <div className="relative flex flex-col lg:flex-row justify-start w-full lg:w-[578px] gap-8 lg:gap-24 pr-0 lg:pr-20">
        <div className="flex flex-col items-center lg:items-start">
          <div className="text-center lg:text-justify text-zinc-900 text-2xl font-bold font-montserrat leading-normal pl-5 pt-6 ">
            Mengapa harus memilih Aplikasi ini?
          </div>
  
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pt-6 ">
            <div className="flex flex-col items-center lg:items-start">
              <img src={logo} alt="image" className="w-30 h-16 mx-auto lg:pl-16" />
              <div className="text-center lg:text-justify text-zinc-800 text-xl font-semibold font-montserrat leading-normal pt-4">
                Kemudahan Akses
              </div>
              <p className="font-montserrat text-center lg:text-left text-sm px-4 lg:px-0">
                Kemudahan akses memungkinkan pengguna mengajukan aduan kapan saja dan dari mana saja.
              </p>
            </div>
  
            <div className="flex flex-col items-center lg:items-start">
              <img src={logo2} alt="image" className="w-30 h-16 mx-auto lg:pl-16" />
              <div className="text-center lg:text-justify text-zinc-800 text-xl font-semibold font-montserrat leading-normal pt-4">
                Penanganan yang Cepat
              </div>
              <p className="font-montserrat text-center lg:text-left text-sm px-4 lg:px-0">
                Penanganan cepat meningkatkan respons, efisiensi, dan kepuasan pengguna.
              </p>
            </div>
  
            <div className="flex flex-col items-center lg:items-start">
              <img src={logo3} alt="image" className="w-30 h-16 mx-auto lg:pl-16" />
              <div className="text-center lg:text-justify text-zinc-800 text-xl font-semibold font-montserrat leading-normal pt-4">
                Keamanan Data
              </div>
              <p className="font-montserrat text-center lg:text-left text-sm px-4 lg:px-0">
                Keamanan data melindungi informasi sensitif dari akses, penggunaan, menjaga privasi dan integritas data.
              </p>
            </div>
  
            <div className="flex flex-col items-center lg:items-start">
              <img src={logo4} alt="image" className="w-30 h-16 mx-auto lg:pl-16" />
              <div className="text-center lg:text-justify text-zinc-800 text-xl font-semibold font-montserrat leading-normal pt-4">
                Feedback dan Evaluasi
              </div>
              <p className="font-montserrat text-center lg:text-left text-sm px-4 lg:px-0">
                Feedback dan evaluasi membantu meningkatkan kualitas layanan dan produk dengan mengidentifikasi area yang perlu diperbaiki.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Benefits;
