import { useState, useEffect } from "react";
import CardNews from "../../components/Berita/cardNews";
import ButtonNews from "../../components/Berita/buttonNews";
import HeaderLayout from "../../components/Header/HeaderLayout";
import SidebarLayout from "../../components/Header/SidebarLayout";
import { IoSearch } from "react-icons/io5";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/api/v1/news",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNews(data.data);
    } catch (error) {
      console.error("Error fetching news: ", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNews = news.filter((berita) =>
    berita.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <ButtonNews />
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
              {filteredNews.map((berita) => (
                <div
                  key={berita.id}
                  style={{ marginRight: "42px", marginBottom: "38px" }}
                >
                  <CardNews
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
              ))}
              {filteredNews.length === 0 && (
                <div className="w-full text-center text-gray-500">
                  Tidak ada berita yang ditemukan.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsPage;
