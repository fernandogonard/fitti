import React from 'react';
import PropTypes from 'prop-types';
import { useCartStore } from '../store';
import { FaTimes, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';

export default function Cart({ isOpen, onClose }) {
  const { items, total, updateQuantity, removeItem, clearCart } = useCartStore();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-700 p-4">
            <div className="flex items-center gap-2">
              <FaShoppingCart className="text-orange" />
              <h2 className="text-xl font-bold">Carrito ({items.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-800 transition-colors"
              aria-label="Cerrar carrito"
            >
              <FaTimes />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <FaShoppingCart className="mx-auto text-4xl text-gray-600 mb-4" />
                <p className="text-gray-400">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-800 rounded-lg p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-400">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600"
                            aria-label="Disminuir cantidad"
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600"
                            aria-label="Aumentar cantidad"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                      <p className="text-xs text-gray-400">{formatPrice(item.price)} c/u</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-700 p-4 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-orange">{formatPrice(total)}</span>
              </div>
              
              <div className="space-y-2">
                <button className="btn-primary w-full">
                  Finalizar Compra
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-red-400 hover:text-red-300 transition-colors text-sm"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};