// Service Worker para PWA y caché offline
const CACHE_NAME = 'fittipald1-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/catalog',
  '/technology',
  '/about',
  '/manifest.json',
  '/assets/logo-fittipald1.png',
  '/assets/icon-192x192.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('✅ Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker install failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip non-HTTP requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log('📦 Serving from cache:', event.request.url);
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache images and static assets
            if (shouldCache(event.request.url)) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  console.log('💾 Caching new asset:', event.request.url);
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch(() => {
            // Network failed, serve offline fallback
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
            
            // For images, serve a placeholder
            if (event.request.destination === 'image') {
              return caches.match('/assets/offline-image.svg');
            }
          });
      })
  );
});

// Determine if a URL should be cached
function shouldCache(url) {
  // Cache images, fonts, and static assets
  return url.includes('/assets/') || 
         url.includes('.png') || 
         url.includes('.jpg') || 
         url.includes('.webp') || 
         url.includes('.svg') ||
         url.includes('.woff') ||
         url.includes('.woff2');
}

// Background sync for forms
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingForms = await getPendingFormSubmissions();
    
    for (const form of pendingForms) {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        });
        
        // Remove from pending list
        await removePendingFormSubmission(form.id);
        console.log('✅ Form synced successfully');
        
      } catch (error) {
        console.log('❌ Form sync failed, will retry later');
      }
    }
  } catch (error) {
    console.error('Background sync error:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/icon-192x192.png',
    badge: '/assets/icons/icon-72x72.png',
    tag: data.tag || 'general',
    data: data.data || {},
    actions: [
      {
        action: 'open',
        title: 'Ver',
        icon: '/assets/icons/action-open.png'
      },
      {
        action: 'close',
        title: 'Cerrar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Placeholder functions for IndexedDB operations
async function getPendingFormSubmissions() {
  // Implement IndexedDB operations
  return [];
}

async function removePendingFormSubmission(id) {
  // Implement IndexedDB operations
  return true;
}