import { Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";

// Páginas principales
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Technology from "./pages/Technology";
import Distributors from "./pages/Distributors";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Accessories from "./pages/Accessories";
import Guide from "./pages/Guide";

function App() {
  return (
      <div className="min-h-screen flex flex-col bg-black text-white font-sans">
        {/* Navbar persistente */}
        <Navbar />

        {/* Contenido principal */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/distributors" element={<Distributors />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/guide" element={<Guide />} />
          </Routes>
        </main>

        {/* Footer persistente */}
        <Footer />
        <FloatingWhatsAppButton />
      </div>
  
  );
}

export default App;
