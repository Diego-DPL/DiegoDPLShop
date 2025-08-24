import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCents } from '../utils/format';

const Cart: React.FC = () => {
  const { items, remove, setQty, totalItems, totalPriceCents, clear } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [removingItem, setRemovingItem] = useState<string | null>(null);

  // SEO Optimization
  useEffect(() => {
    document.title = items.length > 0 
      ? `Carrito (${totalItems}) | DiegoDPL Shop - Sample Libraries Premium`
      : "Carrito Vacío | DiegoDPL Shop - Sample Libraries Premium";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        items.length > 0 
          ? `Revisa tu carrito con ${totalItems} samples musicales premium de DiegoDPL. Total: ${formatCents(totalPriceCents)}. ¡Finaliza tu compra y transforma tu música!`
          : 'Tu carrito está vacío. Explora nuestro catálogo de sample libraries premium y loops exclusivos de DiegoDPL para llevar tu música al siguiente nivel.'
      );
    }

    // Structured Data para E-commerce
    if (items.length > 0) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "ShoppingCart",
        "name": "Carrito de Compras - DiegoDPL",
        "description": "Carrito de compras con sample libraries premium",
        "url": "https://diegodpl.com/cart",
        "totalPrice": (totalPriceCents / 100).toFixed(2),
        "priceCurrency": "EUR",
        "numberOfItems": totalItems,
        "itemListElement": items.map((item, index) => ({
          "@type": "Product",
          "position": index + 1,
          "name": item.name,
          "image": item.image,
          "offers": {
            "@type": "Offer",
            "price": (item.price / 100).toFixed(2),
            "priceCurrency": "EUR"
          },
          "quantity": item.quantity
        }))
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        try {
          document.head.removeChild(script);
        } catch (e) {
          // Script might have been removed already
        }
      };
    }
  }, [items, totalItems, totalPriceCents]);

  const handleRemoveItem = async (id: string) => {
    setRemovingItem(id);
    setTimeout(() => {
      remove(id);
      setRemovingItem(null);
    }, 300);
  };

  const handleClearCart = () => {
    if (showClearConfirm) {
      clear();
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  };

  const getTotalSavings = () => {
    // Simulamos un descuento por volumen
    if (totalItems >= 5) return totalPriceCents * 0.15;
    if (totalItems >= 3) return totalPriceCents * 0.10;
    return 0;
  };

  const savings = getTotalSavings();
  const originalPrice = totalPriceCents + savings;

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-20 pb-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent font-['Plus_Jakarta_Sans'] mb-4">
                  Tu Carrito 🛒
                </h1>
                {items.length > 0 ? (
                  <p className="text-xl text-gray-300">
                    <span className="text-lime-300 font-bold">{totalItems}</span> {totalItems === 1 ? 'sample' : 'samples'} listos para potenciar tu música
                  </p>
                ) : (
                  <p className="text-xl text-gray-400">
                    Aún no has agregado ningún sample a tu colección
                  </p>
                )}
              </div>
              
              {items.length > 0 && (
                <div className="hidden md:block text-right">
                  <div className="text-3xl font-bold text-lime-300">{formatCents(totalPriceCents)}</div>
                  {savings > 0 && (
                    <div className="text-sm text-gray-400">
                      Ahorras: <span className="text-emerald-400 font-bold">{formatCents(savings)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-950 min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            
            {items.length === 0 ? (
              /* Empty Cart State */
              <div className="text-center py-16">
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v7a1 1 0 001 1h8a1 1 0 001-1v-7m-9 4h.01M16 20h.01"/>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-300 mb-4">Tu carrito está esperando</h2>
                  <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
                    ¡Dale vida a tus producciones! Explora nuestro catálogo de samples premium y encuentra el sonido perfecto para tu próximo hit.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-lime-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Calidad Premium</h3>
                    <p className="text-gray-400 text-sm">Samples de alta calidad profesional grabados en estudios de primer nivel</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Descarga Instantánea</h3>
                    <p className="text-gray-400 text-sm">Acceso inmediato a todos tus samples una vez completada la compra</p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Licencia Comercial</h3>
                    <p className="text-gray-400 text-sm">Úsalos en tus producciones comerciales sin restricciones</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/catalog" 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-gray-900 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    Explorar Catálogo
                  </Link>
                  <div className="text-gray-500 text-sm">
                    O <Link to="/" className="text-lime-400 hover:text-lime-300 underline">vuelve al inicio</Link>
                  </div>
                </div>
              </div>
            ) : (
              /* Cart with Items */
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-100">Productos en tu carrito</h2>
                    <button
                      onClick={handleClearCart}
                      className={`px-3 py-2 md:px-4 text-sm md:text-base rounded-lg font-medium transition-all duration-300 ${
                        showClearConfirm 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600'
                      }`}
                    >
                      {showClearConfirm ? '¿Confirmar?' : 'Vaciar'}
                    </button>
                  </div>

                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-4 md:p-6 transition-all duration-300 hover:border-lime-500/30 ${
                        removingItem === item.id ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      <div className="flex gap-4 md:gap-6">
                        {/* Product Image */}
                        <div className="w-20 h-16 md:w-32 md:h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-600">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0 pr-2">
                              <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-1 leading-tight">{item.name}</h3>
                              <p className="text-gray-400 text-sm">Sample Library Premium</p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-400 transition-colors duration-300 p-2 hover:bg-red-500/10 rounded-lg flex-shrink-0"
                              disabled={removingItem === item.id}
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                              </svg>
                            </button>
                          </div>

                          {/* Mobile Layout for Quantity and Price */}
                          <div className="md:hidden space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-lg md:text-2xl font-bold text-lime-300">{formatCents(item.price * item.quantity)}</span>
                              {item.quantity > 1 && (
                                <span className="text-sm text-gray-400">{formatCents(item.price)} c/u</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-2">
                              <span className="text-gray-300 text-sm font-medium">Cantidad:</span>
                              <div className="flex items-center bg-gray-800 rounded-lg border border-gray-600">
                                <button
                                  onClick={() => setQty(item.id, Math.max(1, item.quantity - 1))}
                                  className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 13H5v-2h14v2z"/>
                                  </svg>
                                </button>
                                <input
                                  type="number"
                                  min={1}
                                  max={99}
                                  value={item.quantity}
                                  onChange={(e) => setQty(item.id, Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                                  className="w-12 bg-transparent text-gray-200 text-center py-2 focus:outline-none"
                                />
                                <button
                                  onClick={() => setQty(item.id, Math.min(99, item.quantity + 1))}
                                  className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Layout for Quantity and Price */}
                          <div className="hidden md:flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <label className="text-gray-300 text-sm font-medium">Cantidad:</label>
                              <div className="flex items-center bg-gray-800 rounded-lg border border-gray-600">
                                <button
                                  onClick={() => setQty(item.id, Math.max(1, item.quantity - 1))}
                                  className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 13H5v-2h14v2z"/>
                                  </svg>
                                </button>
                                <input
                                  type="number"
                                  min={1}
                                  max={99}
                                  value={item.quantity}
                                  onChange={(e) => setQty(item.id, Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                                  className="w-16 bg-transparent text-gray-200 text-center py-2 focus:outline-none"
                                />
                                <button
                                  onClick={() => setQty(item.id, Math.min(99, item.quantity + 1))}
                                  className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-lime-300">{formatCents(item.price * item.quantity)}</div>
                              {item.quantity > 1 && (
                                <div className="text-sm text-gray-400">{formatCents(item.price)} cada uno</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-4 md:p-6 lg:sticky lg:top-24">
                    <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-4 md:mb-6">Resumen del pedido</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-300">
                        <span>Productos ({totalItems})</span>
                        <span>{formatCents(originalPrice)}</span>
                      </div>
                      
                      {savings > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Descuento por volumen</span>
                          <span>-{formatCents(savings)}</span>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-600 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-gray-100">Total</span>
                          <span className="text-lime-300">{formatCents(totalPriceCents)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Volume Discount Info */}
                    {totalItems >= 3 && (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span className="text-emerald-400 font-bold text-sm">¡Descuento aplicado!</span>
                        </div>
                        <p className="text-emerald-300 text-xs">
                          {totalItems >= 5 ? 'Descuento del 15% por 5+ productos' : 'Descuento del 10% por 3+ productos'}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Link 
                        to="/checkout" 
                        className="w-full flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-gray-900 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                        Finalizar Compra
                      </Link>
                      
                      <Link 
                        to="/catalog" 
                        className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg border border-gray-600 transition-colors duration-300 text-sm md:text-base"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                        Seguir comprando
                      </Link>
                    </div>

                    {/* Trust Signals */}
                    <div className="mt-6 pt-6 border-t border-gray-600">
                      <div className="space-y-3 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                          </svg>
                          <span>Pago 100% seguro</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9h-1V7c0-2.76-2.24-5-5-5S8 4.24 8 7v2H7c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-7 6c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm2-6H10V7c0-1.1.9-2 2-2s2 .9 2 2v2z"/>
                          </svg>
                          <span>Descarga inmediata</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span>Licencia comercial incluida</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
