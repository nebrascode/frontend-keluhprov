import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch } from "react-icons/io5";
import { fetchNews } from '../services/newsSlice';
import CardNews from "../components/Berita/cardNews";
import ButtonNews from "../components/Berita/buttonNews";
import HeaderLayout from '../components/Header/HeaderLayout';
import SidebarLayout from '../components/Header/SidebarLayout';

const NewsPage = () => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news.news);
    const loading = useSelector((state) => state.news.loading);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredNews = news.filter((berita) =>
        berita.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const CardNews = ({ image, title, description, newsId }) => {
        const handleViewDetail = () => {
            // Implementasi navigasi ke halaman detail berita jika diperlukan
            console.log(`Navigasi ke detail berita dengan ID: ${newsId}`);
            navigate(`/news-detail/${newsId}`);
        };

        return (
            <div className="lg:w-[486px] h-[500px] px-5 py-8 bg-slate-50 rounded-2xl flex flex-col shadow">
                <img className="w-full h-48 rounded-lg shadow" src={image} alt={title} />
                <div className="w-full flex-col justify-start items-start gap-4 inline-flex">
                    <div className="text-center text-black text-2xl font-medium font-poppins leading-tight tracking-tight mt-3">{title}</div>
                    <div className="text-justify text-black text-base font-medium font-montserrat leading-7">
                        {description}
                    </div>
                </div>
                <div className="flex gap-6 mt-auto">
                    <button onClick={handleViewDetail} className="bg-info-3 text-white px-6 py-2.5 rounded shadow">Detail</button>
                    <button className="bg-error-3 text-white px-6 py-2.5 rounded shadow">Hapus</button>
                </div>
            </div>
        );
    };

    return (
        <section className="flex w-full flex-col">
            <HeaderLayout />
            <SidebarLayout />
            <div className="flex-grow lg:ml-[287px] min-h-[80dvh] overflow-y-auto">
                <div className="bg-light-2 px-8">
                    <div className="pt-9 font-poppins text-black text-4xl font-medium">
                        Kelola Berita
                    </div>
                    <div className="container mt-9 w-full bg-gray-300 justify-between px-5 pt-5 rounded-lg min-h-[70vh]">
                        <div className="container lg:flex justify-between items-center mb-5">
                            <div className="flex mt-5 lg:mt-0 px-2 lg:w-80 items-center rounded border border-gray-400 bg-white">
                                <span className="text-2xl">
                                    <IoSearch />
                                </span>
                                <input
                                    type="text"
                                    className="lg:w-80 border-none"
                                    placeholder="Kata kunci atau tracking ID"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                        <div className="container w-full flex flex-wrap gap-2">
                            {loading ? (
                                // Show loading text while data is being fetched
                                <div className="w-full text-center text-gray-500">Loading...</div>
                            ) : (
                                filteredNews.map((berita) => (
                                    <div
                                        key={berita.id}
                                        style={{ marginRight: "42px", marginBottom: "38px" }}
                                    >
                                        <CardNews id={berita.id}
                                            image={`http://localhost:8000/${
                                                berita.files && berita.files.length > 0
                                                    ? berita.files[0].path
                                                    : "default.jpg"
                                            }`}
                                            title={berita.title}
                                            description={
                                                berita.content.slice(0, 200) +
                                                (berita.content.length > 200 ? "..." : "")
                                            }
                                        />
                                    </div>
                                ))
                            )}
                            {filteredNews.length === 0 && !loading && (
                                <div className="w-full text-center text-gray-500">Tidak ada berita yang ditemukan.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsPage;
