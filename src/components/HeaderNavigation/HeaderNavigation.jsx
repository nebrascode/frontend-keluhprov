import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false); // Menutup menu di mobile setelah klik link
  };

  return (
    <div className="w-full h-20 bg-white flex justify-between items-center px-6 md:px-12">
      <div>
        <a href="#">
          <img className="w-32 h-auto lg:w-64 lg:h-14" src={logo} alt="Logo" />
        </a>
      </div>
      <div className="hidden md:flex justify-center items-center gap-16">
        <a
          className={`text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker ${
            activeLink === "#home" ? "border-b-2 border-main-color" : ""
          }`}
          href="#home"
          onClick={() => handleLinkClick("#home")}
        >
          Home
        </a>
        <a
          className={`text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker ${
            activeLink === "#benefit" ? "border-b-2 border-main-color" : ""
          }`}
          href="#benefit"
          onClick={() => handleLinkClick("#benefit")}
        >
          Benefit
        </a>
        <a
          className={`text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker ${
            activeLink === "#features" ? "border-b-2 border-main-color" : ""
          }`}
          href="#features"
          onClick={() => handleLinkClick("#features")}
        >
          Features
        </a>
        <a
          className={`text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker ${
            activeLink === "#testimoni" ? "border-b-2 border-main-color" : ""
          }`}
          href="#testimoni"
          onClick={() => handleLinkClick("#testimoni")}
        >
          Testimoni
        </a>
      </div>

      <div className="hidden md:flex">
        <button className="px-4 py-2.5 bg-main-color rounded-full flex justify-center items-center"
        onClick={() => navigate('/login')}>
          <div className="text-zinc-900 text-xl font-normal font-montserrat leading-tight">
            Login
          </div>
        </button>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-zinc-900 text-2xl" />
          ) : (
            <FaBars className="text-zinc-900 text-2xl" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white flex flex-col items-center py-4 z-50">
          <a
            className={`py-2 text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker ${
              activeLink === "#home" ? "border-b-2 border-main-color" : ""
            }`}
            href="#home"
            onClick={() => handleLinkClick("#home")}
          >
            Home
          </a>
          <a
            className={`py-2 text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker ${
              activeLink === "#benefit" ? "border-b-2 border-main-color" : ""
            }`}
            href="#benefit"
            onClick={() => handleLinkClick("#benefit")}
          >
            Benefit
          </a>
          <a
            className={`py-2 text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker ${
              activeLink === "#features" ? "border-b-2 border-main-color" : ""
            }`}
            href="#features"
            onClick={() => handleLinkClick("#features")}
          >
            Features
          </a>
          <a
            className={`py-2 text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker ${
              activeLink === "#testimoni" ? "border-b-2 border-main-color" : ""
            }`}
            href="#testimoni"
            onClick={() => handleLinkClick("#testimoni")}
          >
            Testimoni
          </a>
          <button className="mt-4 p-2.5 bg-main-color rounded-full flex justify-center items-center">
            <div className="text-zinc-900 text-xl font-normal font-montserrat leading-tight">
              Login
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
