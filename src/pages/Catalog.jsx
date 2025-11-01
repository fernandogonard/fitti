import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ProductCard from '../components/ProductCard';

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
            image="/assets/glove-elite-pro.png"
            price={89.99}
            description="Protege-Aqua"
            tag="Nuevo"
            rating={4.5}
          />
          <ProductCard
            name="AeroGlove Pro"
            image="/assets/glove-classic.png"
            price={79.99}
            description="Negativo - Aqua-Green"
            rating={4.2}
          />
          <ProductCard
            name="GripMaster Hybrid"
            image="/assets/glove-junior.png"
            price={69.99}
            description="Hybrid - Black"
          />
          <ProductCard
            name="ProGrip Elite Proxima"
            image="/assets/collections/black-edition.png"
            price={89.99}
            description="Hybrid - Aqua"
          />
          <ProductCard
            name="AeroGlove Classic"
            image="/assets/collections/winter-2025.png"
            price={59.99}
            description="Negativo - Aqua"
          />
          <ProductCard
            name="GripMaster 3.0"
            image="/assets/collections/elite-series.png"
            price={79.99}
            description="Negativo - Black"
          />
        </div>
      </div>
    </BackgroundWrapper>
  );
}
