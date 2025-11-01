import React from "react";
import ProductCard from "./ProductCard";
import glove1 from "../../assets/glove-elite-pro.png";
import glove2 from "../../assets/glove-classic.png";
import glove3 from "../../assets/glove-classic-white.png";

export default function ProductGallery() {
  const products = [
    { name: "Elite Pro", image: glove1, description: "Corte negativo, palma 4mm", price: "$129" },
    { name: "Classic", image: glove2, description: "Durable y cómodo", price: "$89" },
    { name: "Clasico -Blanco", image: glove3, description: "Durable y cómodo", price: "$109" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
      </div>
    </section>
  );
}