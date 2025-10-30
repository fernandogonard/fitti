import React from "react";

export default function ProductCard({ name, image, description, price, tag, rating }) {
  return (
    <article className="group relative w-full max-w-sm bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg">
      {/* Image as background */}
      <div
        className="w-full h-64 bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />

      {/* content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {tag && <span className="bg-orange text-black text-xs font-bold px-2 py-1 rounded">{tag}</span>}
          </div>
          {rating && (
            <div className="text-sm text-gray-300">{rating} ⭐</div>
          )}
        </div>

        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">${price}</div>
          <div className="flex gap-2">
            <button className="bg-orange text-black font-semibold py-2 px-4 rounded hover:bg-gold transition">Ver Detalle</button>
            <button className="bg-transparent border border-gray-700 text-gray-200 py-2 px-3 rounded hover:bg-gray-800 transition">🛒</button>
          </div>
        </div>
      </div>

      {/* hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
    </article>
  );
}