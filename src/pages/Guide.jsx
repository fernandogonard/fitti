import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";

export default function Guide() {
	return (
		<BackgroundWrapper>
			<main className="min-h-screen w-full px-4 py-12 text-black">
				<div className="max-w-5xl mx-auto">
					<h1 className="font-display text-4xl font-extrabold mb-6">Guía de Uso</h1>
					<p className="text-lg mb-4">En esta guía encontrarás recomendaciones para el cuidado y uso de tus guantes Fittipaldi.</p>
					<section className="space-y-4">
						<article>
							<h2 className="font-bold">Limpieza</h2>
							<p className="text-sm">Limpia la palma con agua tibia y jabón neutro. Evita frotar enérgicamente y deja secar al aire lejos del sol directo.</p>
						</article>
						<article>
							<h2 className="font-bold">Secado</h2>
							<p className="text-sm">No uses secadora ni fuentes de calor directo. Rellena con papel absorbente para mantener la forma mientras secan.</p>
						</article>
						<article>
							<h2 className="font-bold">Almacenamiento</h2>
							<p className="text-sm">Guarda en un lugar seco y ventilado, preferiblemente en la bolsa de transporte para evitar deformaciones.</p>
						</article>
					</section>
				</div>
			</main>
		</BackgroundWrapper>
	);
}
