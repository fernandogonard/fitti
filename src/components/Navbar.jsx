import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logoImage from "../assets/branding/fittipaldi.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="sticky top-0 z-50 text-white py-4 px-6 flex justify-between items-center"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="flex items-center gap-2">
        <img src={logoImage} alt="fittipald1 Logo" className="h-14" />
      </div>
      <button
        className="md:hidden text-white text-2xl focus:outline-none"
        onClick={toggleMenu}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent text-center md:text-left`}
      >
        <li className="py-2 md:py-0">
          <Link to="/" onClick={toggleMenu}>
            Inicio
          </Link>
        </li>
        <li className="py-2 md:py-0">
          <Link to="/catalog" onClick={toggleMenu}>
            Catálogo
          </Link>
        </li>
        <li className="py-2 md:py-0">
          <Link to="/about" onClick={toggleMenu}>
            Nosotros
          </Link>
        </li>
        <li className="py-2 md:py-0">
          <Link to="/blog" onClick={toggleMenu}>
            Blog
          </Link>
        </li>
        <li className="py-2 md:py-0">
          <Link to="/guide" onClick={toggleMenu}>
            Guía del Arquero
          </Link>
        </li>
        <li className="py-2 md:py-0">
          <Link to="/technology" onClick={toggleMenu}>
            Tecnología
          </Link>
        </li>
        <li className="py-2 md:py-0">
          <Link to="/accessories" onClick={toggleMenu}>
            Accesorios
          </Link>
        </li>
      </ul>
    </nav>
  );
}