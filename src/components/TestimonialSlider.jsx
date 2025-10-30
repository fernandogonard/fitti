import React from "react";

const testimonials = [
	{
		name: "Juan P.",
		video: "../../assets/chila.mp4",
		quote: "Los guantes mejoraron mi rendimiento en el arco. Excelente agarre y comodidad.",
	},
	{
		name: "Carlos G.",
		video: "../../assets/nabarro-montolla.mp4",
		quote: "Nunca sentí tanta seguridad y control. Fittipaldi es mi elección desde hace años.",
	},
	{
		name: "Roberto S.",
		video: "../../assets/goyco.mp4",
		quote: "La palma y el ajuste son insuperables. Recomendados para arqueros exigentes.",
	},
];

export default function TestimonialSlider() {
	return (
		<section className="max-w-4xl mx-auto px-4 py-12 text-center">
			<h3 className="text-2xl font-display font-bold mb-8">
				Lo que dicen los históricos
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{testimonials.map((t, i) => (
					<div
						key={i}
						className="bg-gray-900 rounded-xl p-4 shadow-lg flex flex-col items-center"
					>
						<div className="w-full aspect-video mb-4 rounded overflow-hidden">
							<video
								src={t.video}
								title={`Testimonio de ${t.name}`}
								controls
								className="w-full h-full rounded"
							/>
						</div>
						<p className="text-gray-200 italic mb-2">“{t.quote}”</p>
						<span className="font-bold text-orange">{t.name}</span>
					</div>
				))}
			</div>
		</section>
	);
}