// SEO utilities for dynamic content and meta management
export class SEOManager {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL || 'https://fittipald1.netlify.app';
    this.siteName = 'fittipald1 Gloves';
    this.defaultImage = '/assets/og-default.jpg';
  }

  // Generate structured data for products
  generateProductSchema(product) {
    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": `${this.baseUrl}${product.image}`,
      "brand": {
        "@type": "Brand",
        "name": "fittipald1"
      },
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "ARS",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "fittipald1 Gloves"
        }
      },
      "aggregateRating": product.rating ? {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.reviewCount || 1
      } : undefined
    };
  }

  // Generate organization schema
  generateOrganizationSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "fittipald1 Gloves",
      "url": this.baseUrl,
      "logo": `${this.baseUrl}/assets/logo-fittipald1.png`,
      "description": "Fabricante de guantes de arquero profesionales con tecnología alemana",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": import.meta.env.VITE_WHATSAPP_NUMBER,
        "contactType": "customer service",
        "availableLanguage": "Spanish"
      },
      "sameAs": [
        "https://www.instagram.com/fittipald1_gloves",
        "https://www.facebook.com/fittipald1gloves"
      ]
    };
  }

  // Generate breadcrumb schema
  generateBreadcrumbSchema(breadcrumbs) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${this.baseUrl}${item.url}`
      }))
    };
  }

  // Inject structured data into page
  injectStructuredData(data) {
    // Remove existing structured data
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // Generate sitemap dynamically
  static async generateSitemap() {
    const baseUrl = 'https://fittipald1.netlify.app';
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/catalog', priority: 0.9, changefreq: 'daily' },
      { url: '/technology', priority: 0.8, changefreq: 'monthly' },
      { url: '/about', priority: 0.7, changefreq: 'monthly' },
      { url: '/contact', priority: 0.6, changefreq: 'monthly' },
      { url: '/accessories', priority: 0.8, changefreq: 'weekly' },
      { url: '/guide', priority: 0.7, changefreq: 'monthly' },
      { url: '/blog', priority: 0.6, changefreq: 'weekly' }
    ];

    // You could also add dynamic product pages here
    // const products = await fetch('/api/products').then(r => r.json());
    // const productPages = products.map(p => ({
    //   url: `/product/${p.id}`,
    //   priority: 0.8,
    //   changefreq: 'weekly',
    //   lastmod: p.updatedAt
    // }));

    const allPages = [...staticPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
  }

  // Generate meta tags for social sharing
  generateSocialMeta(pageData) {
    const meta = {
      title: `${pageData.title} | ${this.siteName}`,
      description: pageData.description,
      image: pageData.image || this.defaultImage,
      url: `${this.baseUrl}${pageData.url || ''}`
    };

    return {
      // Open Graph
      'og:title': meta.title,
      'og:description': meta.description,
      'og:image': meta.image,
      'og:url': meta.url,
      'og:type': pageData.type || 'website',
      'og:site_name': this.siteName,
      
      // Twitter Cards
      'twitter:card': 'summary_large_image',
      'twitter:title': meta.title,
      'twitter:description': meta.description,
      'twitter:image': meta.image,
      
      // Basic meta
      'description': meta.description,
      'keywords': pageData.keywords || 'guantes arquero, fittipald1, portero, futbol'
    };
  }
}

// React hook for SEO management
import { useEffect } from 'react';

export const useSEO = (pageData) => {
  useEffect(() => {
    const seoManager = new SEOManager();
    
    // Update document title
    document.title = `${pageData.title} | ${seoManager.siteName}`;
    
    // Generate and inject meta tags
    const metaTags = seoManager.generateSocialMeta(pageData);
    
    Object.entries(metaTags).forEach(([name, content]) => {
      let element = document.querySelector(`meta[name="${name}"]`) || 
                   document.querySelector(`meta[property="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });

    // Inject structured data if provided
    if (pageData.schema) {
      seoManager.injectStructuredData(pageData.schema);
    }

  }, [pageData]);
};

export const seoManager = new SEOManager();