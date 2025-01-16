import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import HeaderLayout from '../Header/HeaderLayout';
import SidebarLayout from '../Header/SidebarLayout';
import axios from 'axios';

function CategoryLayout() {
  const [category, setCategory] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/v1/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategory(response.data.data);
    } catch (error) {
      console.error('Error fetching category: ', error);
    }
  };

  const deleteCategory = async (categoryID) => {
    try {
      const token = sessionStorage.getItem('token');
      const confirmed = await confirmDelete();

      if (!confirmed) return;

      await axios.delete(`http://localhost:8000/api/v1/categories/${categoryID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategory((prevCategory) =>
        prevCategory.filter((category) => category.ID !== categoryID)
      );

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Kategori berhasil dihapus',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error deleting category: ', error);
    }
  };

  const confirmDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#2563EB',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: 'Deleted!',
        text: 'Your category has been deleted',
        icon: 'success',
        confirmButtonColor: '#DC2626',
      });
      return true;
    } else {
      Swal.fire({
        title: 'Cancelled',
        text: 'Your category is safe :)',
        icon: 'error',
        confirmButtonColor: '#2563EB',
      });
      return false;
    }
  };

  const handleNewCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem('token');
      await axios.post('http://localhost:8000/api/v1/categories', newCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNewCategory({
        Name: '',
        Description: '',
      });
      setIsAdding(false);
      fetchCategory();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Kategori berhasil ditambahkan',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error creating new category:', error);
    }
  };

  const handleEditCategory = (category) => {
    setCurrentCategory({
      id:category.id,
      name: category.name,
      description: category.description,
    });
    setIsEditing(true);
  };

  const handleEditCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleEditCategorySubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(
        `http://localhost:8000/api/v1/categories/${currentCategory.id}`, // Use currentCategory.id here
        {
          name: currentCategory.name,
          description: currentCategory.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjust the content type if necessary
          },
        }
      );
  
      setIsEditing(false);
      setCurrentCategory(null);
      fetchCategory(); // Refresh the categories list
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Kategori berhasil diperbarui',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
  
  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredCategories = category.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <section className="flex w-full flex-col">
      <HeaderLayout />
      <SidebarLayout />
      <div className=" md:pl-80 py-3 px-2 min-h-[80dvh] overflow-y-auto bg-light-1">
        <main className="py-4 px-2">
          <h1 className="text-3xl mb-5 font-bold">Kategori</h1>

          <div className="container mt-9 w-full bg-gray-300 justify-between px-5 pt-5 rounded-lg min-h-[70vh]">
            <section className="flex justify-between">
              <button
                type="button"
                className="flex bg-main-color py-2 pl-4 pr-6 rounded-md mb-4 hover:bg-main-darker"
                onClick={() => setIsAdding(true)}
              >
                <PlusIcon className="size-6 text-black" />
                <p className="font-medium text-black font-montserrat">
                  Tambah Kategori
                </p>
              </button>
              <div className="relative">
                <label htmlFor="Search" className="sr-only">
                  {" "}
                  Search{" "}
                </label>

                <input
                  type="text"
                  id="Search"
                  placeholder="Search for..."
                  value={searchKeyword}
                  onChange={handleSearchInputChange}
                  className="ps-9 md:w-[400px] rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                />

                <span className="absolute left-0 inset-y-0 end-0 grid w-12 -mt-3 place-content-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <span className="sr-only">Search</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 pt-5">
              {filteredCategories.map((category, index) => (
                <div
                  className="bg-white shadow-lg col-auto md:col-span-1 lg:col-span-2 rounded-lg pl-5 pr-5 pt-3 pb-3"
                  key={index}
                >
                  <p className="text-main-color">{category.name}</p>
                  <p>{category.description}</p>
                  <div className="flex gap-3">
                    <button onClick={() => handleEditCategory(category)}>
                    <i className="fa fa-pencil text-info-3" aria-hidden="true"></i>
                    </button>
                    <button onClick={() => deleteCategory(category.id)}>
                      <i className="fa fa-trash text-error-3"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isAdding && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <form
                onSubmit={handleNewCategorySubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
              >
                <h2 className="text-2xl mb-4 font-bold">Tambah Kategori</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-bold" htmlFor="Name">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newCategory.name}
                    onChange={handleNewCategoryInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold" htmlFor="Description">
                    Deskripsi
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={newCategory.description}
                    onChange={handleNewCategoryInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="mr-4 px-4 py-2 text-gray-600"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-main-color text-white rounded"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          )}

          {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <form
                onSubmit={handleEditCategorySubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
              >
                <h2 className="text-2xl mb-4 font-bold">Edit Kategori</h2>
                <div className="mb-4">
                  <label className="block mb-2 font-bold" htmlFor="Name">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="name"
                    value={currentCategory.name}
                    onChange={handleEditCategoryInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold" htmlFor="Description">
                    Deskripsi
                  </label>
                  <input
                    type="text"
                    id="Description"
                    name="description"
                    value={currentCategory.description}
                    onChange={handleEditCategoryInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="mr-4 px-4 py-2 text-gray-600"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-main-color text-white rounded"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

export default CategoryLayout;
