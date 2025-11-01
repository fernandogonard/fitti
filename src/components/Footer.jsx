import React from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import logoImage from "../assets/branding/fittipaldi.png";

export default function Footer() {
  return (
    <footer className="text-white py-10 px-6" style={{ backgroundColor: "#000000" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo y navegación principal */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-4">
            <img
              src={logoImage}
              alt="fittipald1 Logo"
              className="w-full h-auto"
              style={{ maxHeight: "100px" }}
            />
          </div>
          <nav className="flex flex-col gap-2 text-lg mt-2">
            <a href="/" className="hover:text-orange">
              Inicio
            </a>
            <a href="/catalog" className="hover:text-orange">
              Catálogo
            </a>
            <a href="/about" className="hover:text-orange">
              Nosotros
            </a>
            <a href="/blog" className="hover:text-orange">
              Blog
            </a>
            <a href="/guide" className="hover:text-orange">
              Guía del Arquero
            </a>
            <a href="/technology" className="hover:text-orange">
              Tecnología
            </a>
            <a href="/accessories" className="hover:text-orange">
              Accesorios
            </a>
          </nav>
        </div>
        {/* Redes sociales */}
        <div>
          <h3 className="text-xl font-bold mb-4">Síguenos</h3>
          <div className="flex gap-4 text-3xl mb-4">
            <a
              href="https://www.instagram.com/fittipald1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/2233028281"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <p className="text-gray-300 mb-4">
            Unite a la comunidad de arqueros y recibí las últimas novedades.
          </p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Tu email"
              className="bg-black border border-gray-700 rounded px-4 py-2 text-white"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white font-bold py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-300 text-base border-t border-gray-800 pt-6">
        fittipald1 Gloves © 2025 — Todos los derechos reservados
      </div>
    </footer>
  );
}