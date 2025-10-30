import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { FaHandPaper, FaHandRock, FaLock } from "react-icons/fa";
import glovesImg from "../../assets/technology-gloves.webp";

export default function Technology() {
  return (
    <BackgroundWrapper>
      <main className="min-h-screen w-full px-4 py-12 flex flex-col items-center justify-center text-white">
        <section className="max-w-4xl w-full mb-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Tecnología y Materiales</h1>
          <p className="text-lg md:text-xl font-medium mb-6">Descubre la innovación detrás de los guantes Fittipaldi. Cada detalle está pensado para el máximo rendimiento y protección en el arco.</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-5 gap-10 w-full max-w-5xl mb-16">
          <div className="col-span-3 flex flex-col justify-center">
            <div className="flex items-center mb-6">
              <FaHandPaper className="text-orange text-4xl mr-4" />
              <div>
                <h2 className="font-display text-xl font-bold mb-2">Palma</h2>
                <p className="text-sm">Latex Contact Grip Alemán de 4mm de espesor, excelente agarre y durabilidad mejorada.</p>
                <p className="text-sm">Puntos de gel antideslizante en el interior para máximo agarre entre la mano y el guante.</p>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <FaHandRock className="text-orange text-4xl mr-4" />
              <div>
                <h2 className="font-display text-xl font-bold mb-2">Dorso</h2>
                <p className="text-sm">Neopreno con muñequera extendida y detalles en silicona en los nudillos para mejor amortiguación en despejes.</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaLock className="text-orange text-4xl mr-4" />
              <div>
                <h2 className="font-display text-xl font-bold mb-2">Cierre</h2>
                <p className="text-sm">Correa de dos vueltas para mayor seguridad y ajuste personalizado.</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <img src={glovesImg} alt="Guantes Fittipaldi" className="w-full max-w-md" />
          </div>
        </section>
        <section className="w-full max-w-3xl text-center mt-8">
          <h3 className="font-display text-xl font-bold text-orange mb-2">¿Por qué elegir Fittipaldi?</h3>
          <p className="text-lg font-medium mb-4">Nuestros guantes combinan tecnología alemana, diseño ergonómico y materiales premium para que cada atajada sea segura y cómoda. ¡Siente la diferencia en cada partido!</p>
        </section>
      </main>
    </BackgroundWrapper>
  );
}
