// Google Analytics 4 + Facebook Pixel + Hotjar Integration
class Analytics {
  constructor() {
    this.isProduction = import.meta.env.PROD;
    this.gtmId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    this.fbPixelId = import.meta.env.VITE_FB_PIXEL_ID;
    this.hotjarId = import.meta.env.VITE_HOTJAR_ID;
  }

  // Initialize all tracking
  init() {
    if (this.isProduction) {
      this.initGTM();
      this.initFacebookPixel();
      this.initHotjar();
    } else {
      console.log('🔍 Analytics initialized in development mode');
    }
  }

  // Google Tag Manager
  initGTM() {
    // GTM Script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtm.js?id=${this.gtmId}`;
    script.async = true;
    document.head.appendChild(script);

    // DataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', this.gtmId);
  }

  // Facebook Pixel
  initFacebookPixel() {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    window.fbq('init', this.fbPixelId);
    window.fbq('track', 'PageView');
  }

  // Hotjar
  initHotjar() {
    // Verificar que tenemos el ID de Hotjar
    if (!this.hotjarId) {
      console.warn('⚠️ Hotjar ID no configurado en variables de entorno');
      return;
    }

    // Evitar inicialización múltiple
    if (window.hj) {
      console.log('📊 Hotjar ya está inicializado');
      return;
    }

    const hotjarId = this.hotjarId;

    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:parseInt(hotjarId),hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

    console.log('📊 Hotjar inicializado correctamente');
  }

  // E-commerce tracking
  trackPurchase(transactionId, items, total) {
    // GA4 Enhanced Ecommerce
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: total,
        currency: 'ARS',
        items: items.map(item => ({
          item_id: item.id,
          item_name: item.name,
          category: item.category,
          quantity: item.quantity,
          price: item.price
        }))
      });
    }

    // Facebook Conversion API
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value: total,
        currency: 'ARS',
        content_ids: items.map(item => item.id),
        content_type: 'product'
      });
    }
  }

  trackAddToCart(product) {
    // GA4
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'ARS',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          category: product.category,
          price: product.price
        }]
      });
    }

    // Facebook
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        value: product.price,
        currency: 'ARS',
        content_ids: [product.id],
        content_type: 'product'
      });
    }
  }

  trackViewContent(product) {
    // GA4
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'ARS',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          category: product.category,
          price: product.price
        }]
      });
    }

    // Facebook
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        value: product.price,
        currency: 'ARS',
        content_ids: [product.id],
        content_type: 'product'
      });
    }
  }

  // Lead generation
  trackLead(formData) {
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'engagement',
        event_label: formData.source || 'website'
      });
    }

    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: formData.source || 'Contact Form'
      });
    }
  }
}

export const analytics = new Analytics();

// React Hook for analytics
import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    analytics.init();
  }, []);

  return {
    trackPurchase: analytics.trackPurchase.bind(analytics),
    trackAddToCart: analytics.trackAddToCart.bind(analytics),
    trackViewContent: analytics.trackViewContent.bind(analytics),
    trackLead: analytics.trackLead.bind(analytics)
  };
};