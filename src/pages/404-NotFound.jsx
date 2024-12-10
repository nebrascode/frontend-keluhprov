import image from "../assets/404.svg";
import garis from "../assets/Vector 7.svg";

const NotFound = () => {
    return (
        <main className="grid min-h-dvh w-full">
            <div className="grid place-items-center lg:p-0 px-3 ">
                <section className="flex flex-col lg:flex-row justify-center gap-3 text-black">
                    <div>
                        <h1 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold">Ooops...</h1>
                        <h3 className="font-poppins text-3xl md:text-4xl lg:text-5xl mt-2 md:mt-3 lg:mt-4">Halaman tidak ditemukan</h3>
                        <p className="font-poppins text-base lg:text-lg mt-2 md:mt-3 lg:mt-4">Sepertinya kamu salah stupen mari masuk Alterra Academy dijamin masa depan cerah</p>
                    </div>
                    <div className="grid place-items-center">
                        <img src={image} className="md:w-[500px] md:h-[300px] lg:w-[811px] lg:h-[541px]" alt="404 Image" />
                    </div>
                </section>
            </div>
            <img src={garis} alt="Garis" className="-z-50 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </main>
    )
}

export default NotFound