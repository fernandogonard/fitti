import { useEffect } from 'react';

export const useSEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type = 'website' 
}) => {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = `${title} | fittipald1 Gloves`;
    }

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    if (description) updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);

    // Open Graph
    if (title) updateMetaTag('og:title', title, true);
    if (description) updateMetaTag('og:description', description, true);
    if (image) updateMetaTag('og:image', image, true);
    if (url) updateMetaTag('og:url', url, true);
    if (type) updateMetaTag('og:type', type, true);

    // Twitter Cards
    if (title) updateMetaTag('twitter:title', title);
    if (description) updateMetaTag('twitter:description', description);
    if (image) updateMetaTag('twitter:image', image);

  }, [title, description, keywords, image, url, type]);
};

// Predefined SEO data for pages
export const SEO_DATA = {
  home: {
    title: 'Guantes de Arquero Profesionales',
    description: 'Descubre los mejores guantes de arquero con tecnología alemana. Máximo agarre, durabilidad y protección para arqueros exigentes.',
    keywords: 'guantes arquero, guantes portero profesional, fittipald1, futbol argentina',
    url: 'https://fittipald1.netlify.app'
  },
  catalog: {
    title: 'Catálogo de Guantes - Todos los Modelos',
    description: 'Explora nuestra colección completa de guantes de arquero: Elite Pro, Classic, Junior y ediciones especiales. Encuentra tu talla perfecta.',
    keywords: 'catalogo guantes arquero, modelos fittipald1, guantes elite pro, guantes junior',
    url: 'https://fittipald1.netlify.app/catalog'
  },
  technology: {
    title: 'Tecnología Alemana en Guantes de Arquero',
    description: 'Conoce la tecnología de vanguardia en nuestros guantes: latex alemán, grip antideslizante, neopreno premium y diseño ergonómico.',
    keywords: 'tecnologia guantes arquero, latex aleman, grip antideslizante, innovacion deportiva',
    url: 'https://fittipald1.netlify.app/technology'
  }
};