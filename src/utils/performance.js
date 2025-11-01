// Performance monitoring and optimization utilities
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      loadTime: 0,
      renderTime: 0,
      resourcesLoaded: 0,
      totalResources: 0
    };
    
    this.observers = new Map();
    this.init();
  }

  init() {
    // Monitor Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeResourceLoading();
  }

  // Largest Contentful Paint
  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.lcp = entry.startTime;
          this.reportMetric('LCP', entry.startTime);
        }
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.set('lcp', observer);
    }
  }

  // First Input Delay
  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = entry.processingStart - entry.startTime;
          this.reportMetric('FID', entry.processingStart - entry.startTime);
        }
      });
      
      observer.observe({ type: 'first-input', buffered: true });
      this.observers.set('fid', observer);
    }
  }

  // Cumulative Layout Shift
  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cls = clsValue;
        this.reportMetric('CLS', clsValue);
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
      this.observers.set('cls', observer);
    }
  }

  // Resource loading
  observeResourceLoading() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.totalResources++;
          if (entry.responseEnd > 0) {
            this.metrics.resourcesLoaded++;
          }
        }
      });
      
      observer.observe({ type: 'resource', buffered: true });
      this.observers.set('resource', observer);
    }
  }

  // Report metrics to analytics
  reportMetric(name, value) {
    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(value),
        non_interaction: true
      });
    }

    // Console log in development
    if (import.meta.env.DEV) {
      console.log(`🚀 Performance Metric - ${name}: ${Math.round(value)}ms`);
    }
  }

  // Get current metrics
  getMetrics() {
    return { ...this.metrics };
  }

  // Clean up observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// React hook for performance monitoring
import { useEffect, useRef } from 'react';

export const usePerformance = (componentName) => {
  const startTime = useRef(performance.now());
  const monitor = useRef(null);

  useEffect(() => {
    // Initialize performance monitor
    if (!monitor.current) {
      monitor.current = new PerformanceMonitor();
    }

    // Component render time
    const renderTime = performance.now() - startTime.current;
    console.log(`⚡ ${componentName} rendered in ${renderTime.toFixed(2)}ms`);

    return () => {
      if (monitor.current) {
        monitor.current.disconnect();
      }
    };
  }, [componentName]);

  return monitor.current?.getMetrics() || {};
};

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (import.meta.env.DEV) {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    console.group('📦 Bundle Analysis');
    console.log(`Scripts loaded: ${scripts.length}`);
    console.log(`Stylesheets loaded: ${styles.length}`);
    
    scripts.forEach((script, index) => {
      console.log(`Script ${index + 1}: ${script.src}`);
    });
    
    styles.forEach((style, index) => {
      console.log(`Stylesheet ${index + 1}: ${style.href}`);
    });
    console.groupEnd();
  }
};

export const performanceMonitor = new PerformanceMonitor();