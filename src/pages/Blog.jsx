import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import testimonial1 from "../../assets/testimonial1.png";
import testimonial2 from "../../assets/testimonial2.png";
import gloveElite from "../../assets/glove-elite-pro.png";
import gloveClassic from "../../assets/glove-classic.png";

const posts = [
  {
    title: "¡Nuevo lanzamiento! Elite Pro 2025",
    image: gloveElite,
    date: "29/10/2025",
    excerpt: "Presentamos el nuevo modelo Elite Pro, con tecnología alemana y máxima protección. Descubre sus características y por qué es el favorito de los profesionales.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, euismod cursus massa enim nec dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
  },
  {
    title: "Tips para cuidar tus guantes",
    image: gloveClassic,
    date: "27/10/2025",
    excerpt: "¿Sabías que el lavado y secado correcto prolonga la vida útil de tus guantes? Te contamos los mejores consejos para mantenerlos como nuevos.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, euismod cursus massa enim nec dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
  },
  {
    title: "Testimonio: portero profesional",
    image: testimonial1,
    date: "25/10/2025",
    excerpt: "'Con fittipald1 Gloves siento seguridad y agarre en cada partido. La diferencia se nota desde el primer uso.' - Lucas G., portero Primera B Nacional.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, euismod cursus massa enim nec dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
  },
  {
    title: "Testimonio: portero juvenil",
    image: testimonial2,
    date: "22/10/2025",
    excerpt: "'Son cómodos y resistentes, ideales para entrenar todos los días.' - Mateo S., portero Sub-17.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, euismod cursus massa enim nec dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
  },
  {
    title: "Historia de la marca fittipald1",
    image: gloveElite,
    date: "20/10/2025",
    excerpt: "Conoce cómo nació fittipald1 Gloves y la pasión detrás de cada diseño.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, euismod cursus massa enim nec dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
  },
  {
    title: "Innovación y tecnología",
    image: gloveClassic,
    date: "18/10/2025",
    excerpt: "Descubre los materiales y procesos que hacen únicos a nuestros guantes.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, euismod cursus massa enim nec dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
  }
];

export default function Blog() {
  return (
    <BackgroundWrapper backgroundImage="../assets/branding/guante-textura.jpg">
      <main className="min-h-screen w-full px-4 py-12 flex flex-col items-center justify-center">
        <section className="max-w-4xl w-full mb-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-orange-500 mb-4 drop-shadow-lg tracking-tight">Noticias y Novedades</h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium mb-6">Mantente al día con los lanzamientos, consejos y testimonios de porteros que confían en fittipald1 Gloves.</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
          {posts.map((post, idx) => (
            <article key={idx} className="bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-gray-800 mb-8">
              <img src={post.image} alt={post.title} className="w-32 h-32 object-cover rounded-xl mb-4 shadow-md" />
              <h2 className="font-display text-xl font-bold text-white mb-2 text-center">{post.title}</h2>
              <span className="text-orange-500 font-bold text-sm mb-2">{post.date}</span>
              <p className="text-gray-300 text-base mb-2 text-center font-medium">{post.excerpt}</p>
              <details className="w-full mt-2">
                <summary className="cursor-pointer text-orange-500 font-semibold mb-2">Leer más</summary>
                <div className="text-gray-400 text-sm mt-2 px-2 pb-2 text-left">
                  {post.content}
                </div>
              </details>
              <a href="/catalog" className="inline-block bg-orange-500 text-black font-bold py-2 px-6 rounded-lg shadow-md hover:bg-orange-400 transition-colors text-sm mt-4">Ver producto</a>
            </article>
          ))}
        </section>
      </main>
    </BackgroundWrapper>
  );
}
