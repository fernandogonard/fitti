import React from "react";
import Hero from "../components/Hero";
import ProductGallery from "../components/ProductGallery";
import TestimonialSlider from "../components/TestimonialSlider";
import bgDark from "@/assets/branding/bacground-page.webp";
import logoImage from "../assets/branding/logo1.png";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url(${bgDark})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="flex items-center justify-center py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 flex justify-center">
            <img
              src={logoImage}
              alt="Fittipaldi Logo"
              className="w-48 h-auto"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-extrabold mb-4">Guantes Fittipaldi</h1>
            <p className="text-lg text-gray-300 mb-6">
              Máximo agarre, protección y diseño profesional para arqueros exigentes.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
                Ver catálogo
              </button>
              <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600 hover:text-white">
                Tecnología
              </button>
            </div>
          </div>
        </div>
      </section>
   
      <ProductGallery />
      <section className="bg-transparent py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Testimonios</h2>
          <TestimonialSlider />
        </div>
      </section>
    </div>
  );
}
