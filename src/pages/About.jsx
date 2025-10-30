import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import logo from '../../assets/tipobanner.png';
import fittipaldiImg from '../../assets/fittipaldi-img.png';
import teamPhoto from '../../assets/team-photo.png';
import sponsorships from "../assets/sponsorships.png";

export default function About() {
  return (
    <BackgroundWrapper>
      <main className="min-h-screen w-full px-4 py-12 flex flex-col items-center justify-center">
        <section className="max-w-4xl w-full mb-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-orange mb-4 drop-shadow-lg tracking-tight">En el Mundo de Porteros</h1>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">Cristian Adrian Fittipaldi</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <img src={fittipaldiImg} alt="Cristian Fittipaldi" className="w-40 h-56 object-cover rounded-xl shadow-lg border-4 border-orange" />
            <div className="text-left max-w-md">
              <p className="text-white text-lg mb-4 font-medium">Cristian Adrian Fittipaldi inició su carrera como arquero a los 13 años en Argentina y muy pronto se consolidó como pieza clave en distintos equipos.</p>
              <p className="text-gray-200 text-base mb-2">Su trayectoria como arquero empieza en el Club Deportivo Norte, pasando por Boca Juniors de Mar del Plata hasta Europa, donde jugó en España e Italia, destacando en clubes como R.C.D. Mallorca, Villajoyosa en 2ª B y Potenza Calcio. Con pasión y constancia acumuló experiencia internacional, dejando su huella en cada equipo.</p>
              <p className="text-gray-200 text-base mb-2">Tras una lesión, amplió su camino formándose como entrenador de porteros y transmitiendo sus conocimientos a jóvenes talentos.</p>
              <p className="text-gray-200 text-base mb-2">Su extensa carrera, marcada por esfuerzo, disciplina y vivencias internacionales, lo inspiró finalmente a crear sus propios guantes de arquero: diseñados desde la experiencia.</p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-8 w-full">
            <img src={logo} alt="Banner Fittipaldi" className="mb-4 rounded-xl shadow-lg" style={{ width: '70%' }} />
            <span className="text-orange font-bold text-lg text-center">De portero a innovador - Guantes de arquero hechos con experiencia</span>
          </div>
        </section>
        {/* Misión y Valores */}
        <section className="max-w-4xl w-full mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-orange mb-6">Nuestra Misión y Valores</h2>
          <p className="text-gray-200 text-lg mb-4">Nuestra misión es proporcionar a los arqueros guantes de la más alta calidad, diseñados con pasión y experiencia, para que puedan rendir al máximo en cada partido.</p>
          <p className="text-gray-200 text-lg mb-4">Nuestros valores incluyen innovación, durabilidad y confianza, reflejados en cada producto que creamos.</p>
        </section>
        {/* Fotos del Equipo */}
        <section className="max-w-4xl w-full text-center">
          <h2 className="font-display text-3xl font-bold text-orange mb-6">Conoce a Nuestro Equipo</h2>
          <img src={teamPhoto} alt="Equipo Fittipaldi" className="rounded-xl shadow-lg mb-4" style={{ width: '80%' }} />
          <p className="text-gray-200 text-lg">Un equipo apasionado y dedicado a llevar la mejor experiencia a los arqueros de todo el mundo.</p>
        </section>
        {/* Patrocinios / Colaboraciones */}
        <section className="max-w-4xl w-full text-center mt-12">
          <h2 className="font-display text-3xl font-bold text-orange mb-6">Patrocinios y Colaboraciones</h2>
          <p className="text-gray-200 text-lg mb-4">Nos enorgullece colaborar con academias, clubes y arqueros profesionales que comparten nuestra pasión por el fútbol.</p>
          <img src={sponsorships} alt="Patrocinios y Colaboraciones" className="rounded-xl shadow-lg mb-4" style={{ width: '80%' }} />
          <p className="text-gray-200 text-lg">Si estás interesado en colaborar con nosotros, contáctanos para explorar oportunidades.</p>
        </section>
      </main>
    </BackgroundWrapper>
  );
}
