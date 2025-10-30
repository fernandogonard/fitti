import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ProductCard from '../components/ProductCard';
import gloveElite from '../../assets/glove-elite-pro.png';
import gloveClassic from '../../assets/glove-classic.png';
import gloveJunior from '../../assets/glove-junior.png';
import blackEdition from "../../assets/collections/black-edition.png";
import winter2025 from '../../assets/collections/winter-2025.png';
import eliteSeries from '../../assets/collections/elite-series.png';
import poseidonEdition from "../../assets/gloves/poseidon-edition.png";

export default function Catalog() {
  return (
    <BackgroundWrapper>
      <div className="min-h-screen w-full px-4 py-12 flex flex-col items-center">
        <header className="w-full max-w-6xl mb-8">
          <h2 className="font-display text-5xl font-extrabold mb-6 text-center text-white tracking-tight">
            Encontrá tus guantes ideales
          </h2>
       
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
          <ProductCard
            name="ProGrip Elite 2025"
            image={gloveElite}
            price={89.99}
            description="Protege-Aqua"
            tag="Nuevo"
            rating={4.5}
          />
          <ProductCard
            name="AeroGlove Pro"
            image={gloveClassic}
            price={79.99}
            description="Negativo - Aqua-Green"
            rating={4.2}
          />
          <ProductCard
            name="GripMaster Hybrid"
            image={gloveJunior}
            price={69.99}
            description="Hybrid - Black"
          />
          <ProductCard
            name="ProGrip Elite Proxima"
            image={blackEdition}
            price={89.99}
            description="Hybrid - Aqua"
          />
          <ProductCard
            name="AeroGlove Classic"
            image={winter2025}
            price={59.99}
            description="Negativo - Aqua"
          />
          <ProductCard
            name="GripMaster 3.0"
            image={eliteSeries}
            price={79.99}
            description="Negativo - Black"
          />
        </div>
      </div>
    </BackgroundWrapper>
  );
}
