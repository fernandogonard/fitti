import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";

export default function Guide() {
	return (
		<BackgroundWrapper backgroundImage="../assets/branding/guante-textura.jpg">
			<main className="min-h-screen w-full px-4 py-12 text-white">
				<div className="max-w-5xl mx-auto">
					<h1 className="font-display text-5xl font-extrabold text-center text-orange-500 mb-8">
						GUÍA DE USO FITTIPALD1
					</h1>
					<p className="text-lg text-center mb-12">
						Saca el máximo rendimiento de tus guantes como un profesional.
					</p>
					<section className="space-y-12">
						<article className="flex items-start space-x-4">
							<div className="text-orange-500 text-3xl">🖐️</div>
							<div>
								<h2 className="font-bold text-2xl text-orange-500 mb-2">
									1. Limpieza
								</h2>
								<p className="text-lg leading-relaxed">
									Limpia la palma con agua tibia y jabón neutro después de cada
									uso. Evita frotar con fuerza o usar detergentes agresivos. Deja
									escurrir el exceso de agua y secar naturalmente a la sombra.
								</p>
								<p className="text-orange-500 font-semibold mt-2">
									Tip Fittipald1: un leve enjuague después de cada entrenamiento
									mantiene el látex más reactivo.
								</p>
							</div>
						</article>
						<article className="flex items-start space-x-4">
							<div className="text-orange-500 text-3xl">💨</div>
							<div>
								<h2 className="font-bold text-2xl text-orange-500 mb-2">
									2. Secado
								</h2>
								<p className="text-lg leading-relaxed">
									Nunca uses secadora ni los expongas al sol o calefactores.
									Coloca papel absorbente dentro de los guantes para mantener la
									formay acelerar el secado.
								</p>
								<p className="text-orange-500 font-semibold mt-2">
									Consejo Pro: alterna entre dos pares para evitar el desgaste
									prematuro.
								</p>
							</div>
						</article>
						<article className="flex items-start space-x-4">
							<div className="text-orange-500 text-3xl">🎒</div>
							<div>
								<h2 className="font-bold text-2xl text-orange-500 mb-2">
									3. Almacenamiento
								</h2>
								<p className="text-lg leading-relaxed">
									Guarda tus guantes en un lugar fresco, seco y ventilado. Usa una funda transpirable. Evita dejarlos en el
									bolso húmedo o en el auto tras el partido.
								</p>
							</div>
						</article>
					</section>
				</div>
			</main>
		</BackgroundWrapper>
	);
}
