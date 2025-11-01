// Monitoreo de Core Web Vitals y Performance
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null
    };
    this.initialized = false;
    this.init();
  }

  init() {
    if (this.initialized) return;
    
    // Web Vitals monitoring
    this.observeWebVitals();
    
    // Custom performance metrics
    this.observeCustomMetrics();
    
    // Error tracking
    this.setupErrorTracking();
    
    // User interaction tracking
    this.setupUserTracking();
    
    this.initialized = true;
  }

  observeWebVitals() {
    // First Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
          this.sendMetric('FCP', entry.startTime);
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.sendMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.metrics.fid = entry.processingStart - entry.startTime;
        this.sendMetric('FID', this.metrics.fid);
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
      this.sendMetric('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });

    // Time to First Byte
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'navigation') {
          this.metrics.ttfb = entry.responseStart - entry.requestStart;
          this.sendMetric('TTFB', this.metrics.ttfb);
        }
      }
    }).observe({ entryTypes: ['navigation'] });
  }

  observeCustomMetrics() {
    // Bundle size tracking
    this.trackBundleSize();
    
    // Memory usage
    this.trackMemoryUsage();
    
    // Network quality
    this.trackNetworkQuality();
    
    // Page load time
    this.trackPageLoadTime();
  }

  trackBundleSize() {
    if ('getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource');
      let totalSize = 0;
      let jsSize = 0;
      let cssSize = 0;
      let imageSize = 0;

      resources.forEach(resource => {
        if (resource.transferSize) {
          totalSize += resource.transferSize;
          
          if (resource.name.endsWith('.js')) {
            jsSize += resource.transferSize;
          } else if (resource.name.endsWith('.css')) {
            cssSize += resource.transferSize;
          } else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
            imageSize += resource.transferSize;
          }
        }
      });

      this.sendMetric('Bundle_Total_Size', totalSize);
      this.sendMetric('Bundle_JS_Size', jsSize);
      this.sendMetric('Bundle_CSS_Size', cssSize);
      this.sendMetric('Bundle_Images_Size', imageSize);
    }
  }

  trackMemoryUsage() {
    if ('memory' in performance) {
      const memInfo = performance.memory;
      this.sendMetric('Memory_Used', memInfo.usedJSHeapSize);
      this.sendMetric('Memory_Total', memInfo.totalJSHeapSize);
      this.sendMetric('Memory_Limit', memInfo.jsHeapSizeLimit);
    }
  }

  trackNetworkQuality() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      this.sendMetric('Network_Type', connection.effectiveType);
      this.sendMetric('Network_Downlink', connection.downlink);
      this.sendMetric('Network_RTT', connection.rtt);
      this.sendMetric('Network_SaveData', connection.saveData);
    }
  }

  trackPageLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.sendMetric('Page_Load_Time', loadTime);
      
      // DOM Content Loaded
      const domContentLoaded = performance.getEntriesByType('navigation')[0];
      if (domContentLoaded) {
        this.sendMetric('DOM_Content_Loaded', domContentLoaded.domContentLoadedEventEnd - domContentLoaded.domContentLoadedEventStart);
      }
    });
  }

  setupErrorTracking() {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.sendError({
        type: 'JavaScript Error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error ? event.error.stack : null,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.sendError({
        type: 'Unhandled Promise Rejection',
        message: event.reason ? event.reason.toString() : 'Unknown promise rejection',
        stack: event.reason ? event.reason.stack : null,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    });

    // React error boundary support
    this.setupReactErrorTracking();
  }

  setupReactErrorTracking() {
    // Custom React error reporting
    window.reportReactError = (error, errorInfo) => {
      this.sendError({
        type: 'React Error',
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    };
  }

  setupUserTracking() {
    // Track user interactions
    ['click', 'scroll', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, this.throttle(() => {
        this.sendMetric(`User_${eventType}`, 1);
      }, 1000));
    });

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      this.sendMetric('Page_Visibility', document.hidden ? 'hidden' : 'visible');
    });

    // Track session duration
    this.trackSessionDuration();
  }

  trackSessionDuration() {
    const sessionStart = Date.now();
    
    const sendSessionDuration = () => {
      const duration = Date.now() - sessionStart;
      this.sendMetric('Session_Duration', duration);
    };

    window.addEventListener('beforeunload', sendSessionDuration);
    window.addEventListener('pagehide', sendSessionDuration);
    
    // Send session data every 30 seconds
    setInterval(sendSessionDuration, 30000);
  }

  sendMetric(name, value, tags = {}) {
    const metric = {
      name,
      value,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      tags: {
        ...tags,
        environment: import.meta.env.VITE_APP_ENV || 'production'
      }
    };

    // Send to multiple services
    this.sendToGoogleAnalytics(metric);
    this.sendToSentry(metric);
    this.sendToCustomEndpoint(metric);
  }

  sendError(error) {
    const errorData = {
      ...error,
      environment: import.meta.env.VITE_APP_ENV || 'production',
      sessionId: this.getSessionId(),
      userId: this.getUserId()
    };

    // Send to error tracking services
    this.sendToSentry(errorData, 'error');
    this.sendToGoogleAnalytics(errorData, 'exception');
    this.sendToCustomEndpoint(errorData, 'error');
  }

  sendToGoogleAnalytics(data, eventType = 'custom_metric') {
    if (typeof gtag === 'function') {
      gtag('event', eventType, {
        custom_parameter: data.name || 'performance_metric',
        value: data.value,
        timestamp: data.timestamp
      });
    }
  }

  sendToSentry(data, level = 'info') {
    if (window.Sentry) {
      if (level === 'error') {
        window.Sentry.captureException(new Error(data.message), {
          extra: data,
          level: 'error'
        });
      } else {
        window.Sentry.addBreadcrumb({
          message: `${data.name}: ${data.value}`,
          level: level,
          data: data
        });
      }
    }
  }

  sendToCustomEndpoint(data, type = 'metric') {
    // Send to your custom monitoring endpoint
    if (navigator.sendBeacon) {
      const payload = JSON.stringify({ ...data, type });
      navigator.sendBeacon('/api/analytics', payload);
    } else {
      // Fallback to fetch
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, type }),
        keepalive: true
      }).catch(err => console.warn('Analytics send failed:', err));
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  getUserId() {
    // Return user ID from your auth system or generate anonymous ID
    let userId = localStorage.getItem('anonymousUserId');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('anonymousUserId', userId);
    }
    return userId;
  }

  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  // Public methods for manual tracking
  trackCustomEvent(eventName, value, tags = {}) {
    this.sendMetric(`Custom_${eventName}`, value, tags);
  }

  trackUserAction(action, details = {}) {
    this.sendMetric(`User_Action_${action}`, 1, details);
  }

  trackPerformancePoint(pointName) {
    const time = performance.now();
    this.sendMetric(`Performance_Point_${pointName}`, time);
    return time;
  }

  // Health check
  getHealthStatus() {
    return {
      initialized: this.initialized,
      metrics: this.metrics,
      timestamp: new Date().toISOString()
    };
  }
}

// Initialize performance monitor
const performanceMonitor = new PerformanceMonitor();

// Export for use in other modules
export default performanceMonitor;

// Make available globally for debugging
if (typeof window !== 'undefined') {
  window.performanceMonitor = performanceMonitor;
}