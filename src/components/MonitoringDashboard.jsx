import React, { useState, useEffect } from 'react';
import performanceMonitor from '../utils/performanceMonitor';

const MonitoringDashboard = () => {
  const [metrics, setMetrics] = useState({
    webVitals: {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null
    },
    performance: {
      bundleSize: 0,
      memoryUsage: 0,
      networkType: 'unknown',
      pageLoadTime: 0
    },
    errors: [],
    uptime: 0,
    activeUsers: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or for admin users
    const shouldShow = import.meta.env.DEV || 
                      localStorage.getItem('showMonitoring') === 'true' ||
                      new URLSearchParams(window.location.search).get('monitoring') === 'true';
    
    setIsVisible(shouldShow);

    if (shouldShow) {
      startMonitoring();
    }
  }, []);

  const startMonitoring = () => {
    // Get initial metrics
    updateMetrics();

    // Update metrics every 5 seconds
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  };

  const updateMetrics = () => {
    const healthStatus = performanceMonitor.getHealthStatus();
    
    setMetrics(prev => ({
      ...prev,
      webVitals: healthStatus.metrics,
      performance: {
        ...prev.performance,
        memoryUsage: performance.memory?.usedJSHeapSize || 0,
        networkType: navigator.connection?.effectiveType || 'unknown'
      }
    }));
  };

  const getVitalStatus = (vital, value) => {
    if (value === null) return 'loading';

    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[vital];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-80 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            🔍 Performance Monitor
          </h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Core Web Vitals */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Core Web Vitals
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(metrics.webVitals).map(([vital, value]) => {
              const status = getVitalStatus(vital, value);
              const statusColors = {
                good: 'text-green-600 bg-green-50 border-green-200',
                'needs-improvement': 'text-yellow-600 bg-yellow-50 border-yellow-200',
                poor: 'text-red-600 bg-red-50 border-red-200',
                loading: 'text-gray-500 bg-gray-50 border-gray-200'
              };

              return (
                <div
                  key={vital}
                  className={`p-2 rounded border ${statusColors[status] || statusColors.loading}`}
                >
                  <div className="font-medium">{vital.toUpperCase()}</div>
                  <div>
                    {value !== null ? formatTime(value) : 'Loading...'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Performance
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Memory Usage:</span>
              <span className="font-mono">{formatBytes(metrics.performance.memoryUsage)}</span>
            </div>
            <div className="flex justify-between">
              <span>Network:</span>
              <span className="font-mono">{metrics.performance.networkType}</span>
            </div>
            <div className="flex justify-between">
              <span>Load Time:</span>
              <span className="font-mono">{formatTime(metrics.performance.pageLoadTime)}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => performanceMonitor.trackCustomEvent('manual_refresh')}
            className="flex-1 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={() => {
              const data = performanceMonitor.getHealthStatus();
              console.log('Performance Data:', data);
            }}
            className="flex-1 px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Export
          </button>
        </div>

        {/* Status Indicator */}
        <div className="mt-2 text-xs text-center text-gray-500">
          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
          Monitoring Active
        </div>
      </div>
    </div>
  );
};

// Higher-Order Component for performance tracking
export const withPerformanceTracking = (WrappedComponent, componentName) => {
  return React.forwardRef((props, ref) => {
    useEffect(() => {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        performanceMonitor.trackCustomEvent(
          'component_render_time',
          endTime - startTime,
          { componentName }
        );
      };
    }, []);

    return <WrappedComponent ref={ref} {...props} />;
  });
};

// React Error Boundary with performance monitoring
export class PerformanceErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Report to performance monitor
    if (window.reportReactError) {
      window.reportReactError(error, errorInfo);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('React Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Algo salió mal
                </h3>
                <p className="text-sm text-gray-500">
                  Ha ocurrido un error inesperado
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Recargar página
              </button>
            </div>
            {import.meta.env.DEV && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-600">
                  Detalles del error (desarrollo)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MonitoringDashboard;