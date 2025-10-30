import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsAppButton() {
  const whatsappLink = "https://wa.me/2233028281?text=Hola%2C%20estoy%20interesado%20en%20los%20guantes%20Fittipaldi.";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center md:block"
      style={{ zIndex: 1000 }}
    >
      <FaWhatsapp size={24} />
    </a>
  );
}