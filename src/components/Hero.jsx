import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/logo-fittipaldi-white.png";

export default function Hero() {
  return (
    <header className="w-full bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4">Guantes Fittipaldi</h1>
          <p className="text-lg text-gray-300 mb-6">Máximo agarre, protección y diseño profesional para arqueros exigentes.</p>
          <div className="flex gap-4">
            <Link to="/catalog">
              <button className="bg-orange-500 text-black font-bold py-2 px-4 rounded">Ver catálogo</button>
            </Link>
            <Link to="/technology">
              <button className="text-white border border-white py-2 px-4 rounded">Tecnología</button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/assets/logo-fittipaldi-white.png" alt="Logo de Fittipaldi" className="w-64 h-64 object-contain" />
        </div>
      </div>
    </header>
  );
}