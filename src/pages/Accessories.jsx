import React from "react";
import ProductCard from "../components/ProductCard";
import bag from '../../assets/accessories/bag.webp';
import towel from "../../assets/accessories/towel.png";
import thermalWear from "../../assets/accessories/thermal-wear.png";
import kneePads from "../../assets/accessories/knee-pads.png";
import reflexTrainer from "../../assets/accessories/reflex-trainer.png";
import bgDark from "@/assets/branding/bacground-page.webp";


export default function Accessories() {
  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center"
      style={{
        backgroundImage: `url(${bgDark})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      <main className="px-6 py-12 flex flex-col items-center">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-10 text-center text-white drop-shadow-lg tracking-tight">
          Accesorios de Entrenamiento
        </h2>
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          <ProductCard
            name="Bolso para Guantes"
            image={bag}
            price={490}
            description="Bolso compacto y resistente para transportar tus guantes."
          />
          <ProductCard
            name="Toalla y Spray Grip"
            image={towel}
            price={290}
            description="Mejora el agarre y mantén tus guantes secos."
          />
          <ProductCard
            name="Indumentaria Térmica"
            image={thermalWear}
            price={890}
            description="Ropa térmica para entrenar en climas fríos."
          />
          <ProductCard
            name="Rodilleras y Coderas"
            image={kneePads}
            price={390}
            description="Protección extra para entrenamientos intensos."
          />
          <ProductCard
            name="Equipo de Reflejos"
            image={reflexTrainer}
            price={1290}
            description="Entrena tus reflejos con este equipo especializado."
          />
          <ProductCard
            name="Bolso Fittipaldi"
            image={bag}
            price={50}
            description="Bolso deportivo Fittipaldi, ideal para llevar tus accesorios y equipo."
          />
          <ProductCard
            name="Ropa térmica Fittipaldi"
            image={thermalWear}
            price={80}
            description="Ropa térmica de alta calidad para entrenamientos en climas fríos."
          />
          <ProductCard
            name="Rodilleras Fittipaldi"
            image={kneePads}
            price={40}
            description="Rodilleras ergonómicas para máxima protección y comodidad."
          />
          <ProductCard
            name="Toalla Fittipaldi"
            image={towel}
            price={20}
            description="Toalla deportiva con diseño exclusivo Fittipaldi."
          />
        </div>
      </main>
      
    </div>
  );
}