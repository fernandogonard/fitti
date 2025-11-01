import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart Store
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (product, quantity = 1) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          const updatedItems = state.items.map(item =>
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          return {
            items: updatedItems,
            total: calculateTotal(updatedItems)
          };
        }
        
        const newItems = [...state.items, { ...product, quantity }];
        return {
          items: newItems,
          total: calculateTotal(newItems)
        };
      }),
      
      removeItem: (productId) => set((state) => {
        const newItems = state.items.filter(item => item.id !== productId);
        return {
          items: newItems,
          total: calculateTotal(newItems)
        };
      }),
      
      updateQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
          return get().removeItem(productId);
        }
        
        const newItems = state.items.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
        return {
          items: newItems,
          total: calculateTotal(newItems)
        };
      }),
      
      clearCart: () => set({ items: [], total: 0 })
    }),
    {
      name: 'fittipald1-cart'
    }
  )
);

// User Store
export const useUserStore = create((set) => ({
  user: null,
  favorites: [],
  recentViews: [],
  
  setUser: (user) => set({ user }),
  
  addToFavorites: (product) => set((state) => ({
    favorites: [...state.favorites, product]
  })),
  
  removeFromFavorites: (productId) => set((state) => ({
    favorites: state.favorites.filter(item => item.id !== productId)
  })),
  
  addToRecentViews: (product) => set((state) => {
    const filtered = state.recentViews.filter(item => item.id !== product.id);
    return {
      recentViews: [product, ...filtered].slice(0, 10) // Keep last 10
    };
  })
}));

// UI Store
export const useUIStore = create((set) => ({
  isLoading: false,
  notifications: [],
  cartOpen: false,
  menuOpen: false,
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, {
      id: Date.now(),
      type: 'info',
      ...notification
    }]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen }))
}));

// Helper function
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Install Zustand: npm install zustand