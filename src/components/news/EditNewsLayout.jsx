import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import HeaderLayout from "../Header/HeaderLayout";
import SidebarLayout from "../Header/SidebarLayout";
import { FileInput, Label } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";

const EditNewsLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState(null);
  const [existingFile, setExistingFile] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setCategory(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/news/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setTitle(data.data.title);
        setContent(data.data.content);
        setCategoryId(data.data.category.id);
        setExistingFile(data.data.files[0].path);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchCategories();
    fetchNews();
  }, [token, id]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", categoryId);
    if (file) {
      formData.append("files", file);
    }

    try {
      await axios.put(
        `http://localhost:8000/api/v1/news/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTitle("");
      setContent("");
      setCategoryId("");
      setFile(null);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Berhasil mengupdate berita",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/news-detail/${id}`);
    } catch (error) {
      console.error("Error updating news:", error);
      alert("Terjadi kesalahan saat mengupdate berita");
    }
  };

  return (
    <section className="flex w-full flex-col">
      <HeaderLayout />
      <SidebarLayout />
      <div className="lg:ml-80 py-3 px-2 min-h-[80dvh] overflow-y-auto">
        <section className="flex flex-col items-start mb-4 text-left">
          <h1 className="text-3xl font-bold border-b-4 border-main-color">
            Edit Berita
          </h1>
        </section>
        <main>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                {/* This upload file */}
                <div className="flex w-1/2 items-center justify-center">
                  <Label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#D50000] bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <img
                        src={`http://localhost:8000/${existingFile}`}
                        alt="News"
                        className="h-32 w-32 object-cover"
                      />
                      <svg
                        width={27}
                        height={27}
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26 14C26 13.3096 25.4404 12.75 24.75 12.75C24.0596 12.75 23.5 13.3096 23.5 14H26ZM13.5 4C14.1904 4 14.75 3.44036 14.75 2.75C14.75 2.05964 14.1904 1.5 13.5 1.5V4ZM22.875 24H4.125V26.5H22.875V24ZM3.5 23.375V4.625H1V23.375H3.5ZM23.5 14V23.375H26V14H23.5ZM4.125 4H13.5V1.5H4.125V4ZM4.125 24C3.77982 24 3.5 23.7202 3.5 23.375H1C1 25.1009 2.39911 26.5 4.125 26.5V24ZM22.875 26.5C24.6009 26.5 26 25.1009 26 23.375H23.5C23.5 23.7202 23.2202 24 22.875 24V26.5ZM3.5 4.625C3.5 4.27982 3.77982 4 4.125 4V1.5C2.39911 1.5 1 2.89911 1 4.625H3.5Z"
                          fill="#6B7280"
                        />
                        <path
                          d="M2.25 20.8747L8.93319 14.7485C9.39931 14.3212 10.1112 14.3093 10.5913 14.7209L18.5 21.4997"
                          stroke="#6B7280"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 18.3749L18.9834 15.3915C19.4232 14.9517 20.1196 14.9022 20.6173 15.2754L24.75 18.3749"
                          stroke="#6B7280"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.25 6.5H24.75"
                          stroke="#6B7280"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 2.75V10.25"
                          stroke="#6B7280"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <p className="mb-2 text-sm font-montserrat text-dark-3 dark:text-gray-400">
                        Drop image here or select File
                      </p>
                      <p className="text-xs font-montserrat text-black/[.4] dark:text-gray-400">
                        Recommended use 300 x 300 px for default theme
                      </p>
                    </div>
                    <FileInput
                      id="dropzone-file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>
                <div className="flex flex-col w-1/2 space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="title">Judul Berita</label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="kategory">Kategori Berita</label>
                    <select
                      id="kategory"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">Pilih kategori Berita</option>
                      {category.map((category, index) => (
                        <option key={index} value={category.ID}>
                          {category.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="content">Isi Berita</label>
              <textarea
                required
                id="content"
                cols="30"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end pt-4">
              <section>
                <Link
                  to="/news"
                  className="border border-black w-56 bg-white mr-2 pl-5 pr-5 py-1 rounded"
                >
                  Kembali ke Kelola Berita
                </Link>
                <button
                  type="submit"
                  className=" bg-main-color font-semibold w-24 py-1 rounded"
                >
                  Simpan
                </button>
              </section>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
};

export default EditNewsLayout;
