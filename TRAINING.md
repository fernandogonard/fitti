# 🎓 Guía de Training - fittipald1 Gloves Enterprise

## 📋 Programa de Capacitación

### 🎯 Objetivos del Training
- Dominar el stack tecnológico moderno
- Implementar mejores prácticas enterprise
- Manejar herramientas de monitoreo y deployment
- Garantizar consistencia en el equipo

---

## 📚 Módulo 1: Fundamentos del Stack

### 🔧 React 18 + Hooks Modernos
```javascript
// ✅ Mejores Prácticas
const ProductCard = ({ product, onAddToCart }) => {
  // Custom hooks para lógica reutilizable
  const { isLoading, error, data } = useProductDetails(product.id);
  const { addToCart } = useCart();
  
  // Optimización de renders con useMemo/useCallback
  const formattedPrice = useMemo(() => 
    formatCurrency(product.price), [product.price]
  );
  
  const handleAddToCart = useCallback(() => {
    addToCart(product);
    onAddToCart?.(product);
  }, [product, addToCart, onAddToCart]);
  
  // Error boundaries y loading states
  if (error) return <ErrorFallback error={error} />;
  if (isLoading) return <ProductCardSkeleton />;
  
  return (
    <div className="product-card">
      <LazyImage src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{formattedPrice}</p>
      <Button onClick={handleAddToCart}>Agregar</Button>
    </div>
  );
};
```

### 📦 Zustand State Management
```javascript
// ✅ Store Structure Enterprise
const useCartStore = create((set, get) => ({
  // State
  items: [],
  total: 0,
  isLoading: false,
  
  // Actions
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }
    
    return {
      items: [...state.items, { ...product, quantity: 1 }]
    };
  }),
  
  // Computed values
  getTotal: () => {
    const state = get();
    return state.items.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
  },
  
  // Async actions
  syncWithServer: async () => {
    set({ isLoading: true });
    try {
      const cart = await api.getCart();
      set({ items: cart.items, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  }
}));
```

### 🎨 TailwindCSS Enterprise Patterns
```css
/* ✅ Component Classes */
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2;
  }
  
  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md;
  }
  
  .form-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  }
}
```

---

## 📊 Módulo 2: Performance & Optimization

### ⚡ Lazy Loading Strategies
```javascript
// ✅ Route-based Code Splitting
const HomePage = lazy(() => import('../pages/Home'));
const CatalogPage = lazy(() => import('../pages/Catalog'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));

// ✅ Component Lazy Loading
const LazyImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};
```

### 🔍 SEO y Meta Tags
```javascript
// ✅ SEO Hook
const useSEO = ({ title, description, keywords, image }) => {
  useEffect(() => {
    // Update title
    document.title = `${title} | fittipald1 Gloves`;
    
    // Update meta tags
    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    
    // Open Graph tags
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:image', image);
    
    // Twitter Cards
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);
  }, [title, description, keywords, image]);
};
```

---

## 🧪 Módulo 3: Testing Enterprise

### 🎯 Unit Testing with Jest
```javascript
// ✅ Component Testing
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Glove',
    price: 99.99,
    image: 'test-image.jpg'
  };

  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Glove')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByAltText('Test Glove')).toBeInTheDocument();
  });

  test('calls onAddToCart when button clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    
    fireEvent.click(screen.getByText('Agregar al carrito'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('handles loading state', () => {
    render(<ProductCard product={mockProduct} isLoading={true} />);
    expect(screen.getByTestId('product-skeleton')).toBeInTheDocument();
  });
});

// ✅ Store Testing
import { renderHook, act } from '@testing-library/react';
import { useCartStore } from '../store';

describe('CartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  test('adds item to cart', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(mockProduct);
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      ...mockProduct,
      quantity: 1
    });
  });
});
```

### 🎭 E2E Testing with Playwright
```javascript
// ✅ E2E Test Suite
import { test, expect } from '@playwright/test';

test.describe('Product Catalog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/catalog');
  });

  test('should load and display products', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');
    
    // Check if products are displayed
    const products = page.locator('[data-testid="product-card"]');
    await expect(products).toHaveCountGreaterThan(0);
  });

  test('should filter products by category', async ({ page }) => {
    // Click on category filter
    await page.click('[data-testid="category-racing"]');
    
    // Wait for filtered results
    await page.waitForLoadState('networkidle');
    
    // Verify all products are racing gloves
    const products = page.locator('[data-testid="product-card"]');
    const count = await products.count();
    
    for (let i = 0; i < count; i++) {
      const category = await products.nth(i).getAttribute('data-category');
      expect(category).toBe('racing');
    }
  });

  test('should add product to cart', async ({ page }) => {
    // Click first product's add to cart button
    await page.click('[data-testid="product-card"]:first-child [data-testid="add-to-cart"]');
    
    // Check cart indicator updates
    const cartCount = page.locator('[data-testid="cart-count"]');
    await expect(cartCount).toHaveText('1');
    
    // Verify success message
    await expect(page.locator('[data-testid="toast-success"]')).toBeVisible();
  });
});
```

---

## 🚀 Módulo 4: Deployment & CI/CD

### 📦 GitHub Actions Workflow
```yaml
# ✅ Production Pipeline
name: 🚀 Production Deployment

on:
  push:
    branches: [ main ]
    
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 📦 Checkout
        uses: actions/checkout@v4
        
      - name: 🏗️ Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: 📋 Install dependencies
        run: npm ci
        
      - name: 🧪 Run tests
        run: |
          npm run test:unit
          npm run test:e2e:ci
          npm run lint
          
      - name: 🏗️ Build
        run: npm run build
        
      - name: 📊 Performance audit
        run: npx lighthouse-ci autorun
        
      - name: 🚀 Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 🔧 Environment Configuration
```javascript
// ✅ Environment Management
const config = {
  development: {
    API_URL: 'http://localhost:3001',
    ANALYTICS_ID: 'GA-DEV-123',
    DEBUG_MODE: true,
    ERROR_REPORTING: false
  },
  staging: {
    API_URL: 'https://api-staging.fittipald1.com',
    ANALYTICS_ID: 'GA-STAGING-456', 
    DEBUG_MODE: true,
    ERROR_REPORTING: true
  },
  production: {
    API_URL: 'https://api.fittipald1.com',
    ANALYTICS_ID: 'GA-PROD-789',
    DEBUG_MODE: false,
    ERROR_REPORTING: true
  }
};

export default config[import.meta.env.VITE_APP_ENV || 'production'];
```

---

## 📊 Módulo 5: Monitoring & Analytics

### 🔍 Performance Monitoring
```javascript
// ✅ Custom Performance Hook
const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Web Vitals tracking
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });
    
    // Custom performance points
    const navigationStart = performance.timing.navigationStart;
    const loadEventEnd = performance.timing.loadEventEnd;
    const loadTime = loadEventEnd - navigationStart;
    
    sendToAnalytics({
      name: 'page_load_time',
      value: loadTime
    });
  }, []);
  
  const sendToAnalytics = (metric) => {
    gtag('event', 'web_vitals', {
      event_category: 'performance',
      event_label: metric.name,
      value: Math.round(metric.value),
      custom_map: {
        metric_id: metric.id,
        metric_value: metric.value
      }
    });
  };
};
```

### 📈 Error Tracking Setup
```javascript
// ✅ Sentry Configuration
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_APP_ENV,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      )
    })
  ],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  beforeSend: (event, hint) => {
    // Filter out known non-critical errors
    if (event.exception) {
      const error = hint.originalException;
      if (error?.name === 'ChunkLoadError') {
        return null; // Don't report chunk load errors
      }
    }
    return event;
  }
});
```

---

## ✅ Checklist de Competencias

### 📋 Frontend Developer
- [ ] React 18 hooks y patterns
- [ ] Zustand state management  
- [ ] TailwindCSS component patterns
- [ ] Performance optimization
- [ ] Accessibility (WCAG 2.1)
- [ ] SEO implementation
- [ ] PWA development

### 📋 Senior Developer
- [ ] Architecture decisions
- [ ] Code review process
- [ ] Testing strategies
- [ ] Performance monitoring
- [ ] Error handling
- [ ] Security best practices
- [ ] Mentoring junior devs

### 📋 DevOps/Deployment
- [ ] CI/CD pipeline management
- [ ] Environment configuration
- [ ] Monitoring setup
- [ ] Backup procedures
- [ ] Rollback strategies
- [ ] Security headers
- [ ] CDN optimization

---

## 🎯 Ejercicios Prácticos

### Ejercicio 1: Component Optimization
```javascript
// 🎯 TAREA: Optimizar este componente
const ProductList = ({ products, category }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // ❌ Re-render en cada cambio
  useEffect(() => {
    const filtered = products.filter(p => p.category === category);
    setFilteredProducts(filtered);
  }, [products, category]);
  
  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// ✅ SOLUCIÓN: useMemo y optimizaciones
const ProductList = React.memo(({ products, category }) => {
  const filteredProducts = useMemo(() => 
    products.filter(p => p.category === category),
    [products, category]
  );
  
  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
```

### Ejercicio 2: Error Boundary
```javascript
// 🎯 TAREA: Crear Error Boundary para el carrito
class CartErrorBoundary extends React.Component {
  // Implementar error boundary completo
  // con logging, recuperación y UI fallback
}
```

### Ejercicio 3: Performance Test
```javascript
// 🎯 TAREA: Escribir test de performance
test('page loads within 2 seconds', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/catalog');
  await page.waitForLoadState('networkidle');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(2000);
});
```

---

## 📚 Recursos de Aprendizaje

### 📖 Documentación Oficial
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

### 🎥 Videos Recomendados
- React 18 New Features
- Performance Optimization Techniques
- Modern Testing Strategies
- CI/CD Best Practices

### 🔗 Herramientas
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Playwright](https://playwright.dev)
- [Sentry](https://sentry.io)

---

## 🎓 Certificación del Equipo

### Niveles de Competencia
1. **🥉 Junior**: Componentes básicos, hooks, styling
2. **🥈 Mid-level**: State management, testing, optimization
3. **🥇 Senior**: Architecture, monitoring, deployment

### Evaluación Continua
- Code reviews semanales
- Pair programming sessions
- Technical presentations
- Project contributions

---

**🎯 Objetivo**: Equipo 100% capacitado en 4 semanas  
**📊 Métrica**: Todos los desarrolladores nivel Mid+ en el stack  
**🚀 Resultado**: Productividad +300%, calidad enterprise**