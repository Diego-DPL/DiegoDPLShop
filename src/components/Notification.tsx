import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const Notification: React.FC = () => {
  const { recentlyAdded, items } = useCart();
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState('');

  useEffect(() => {
    if (recentlyAdded) {
      const product = items.find(item => item.id === recentlyAdded);
      if (product) {
        setProductName(product.name);
        setShow(true);
        
        // Ocultar la notificación después de 3 segundos
        const timer = setTimeout(() => {
          setShow(false);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [recentlyAdded, items]);

  if (!show) return null;

  return (
    <div className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
      show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-gray-900/95 backdrop-blur-md border border-lime-400/30 rounded-lg p-4 shadow-xl max-w-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center animate-pulse">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-900"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-lime-300 font-semibold text-sm">¡Producto añadido!</p>
            <p className="text-gray-300 text-xs truncate">{productName}</p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
