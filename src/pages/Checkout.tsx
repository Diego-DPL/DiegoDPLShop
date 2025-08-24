import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCents } from '../utils/format';
import { sendDownloadEmail } from '../utils/email';
import { Link, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { items, totalPriceCents, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Determinar si hay productos de pago o solo gratuitos
  const isFreeOrder = useMemo(() => totalPriceCents === 0, [totalPriceCents]);
  const hasDigitalProducts = useMemo(() => 
    items.some(item => item.type === 'digital'), 
    [items]
  );

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    
    if (!user) {
      alert('Debes iniciar sesión para completar la compra');
      return;
    }

    setLoading(true);
    try {
      if (isFreeOrder) {
        // Productos gratuitos: enviar email directamente
        await handleFreeProducts();
      } else {
        // Productos de pago: redireccionar a Stripe
        await handlePaidProducts();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleFreeProducts() {
    try {
      // Generar número de pedido único
      const orderNumber = 'FREE-' + Date.now().toString(36).toUpperCase();
      
      // Enviar email con enlaces de descarga
      const emailSuccess = await sendDownloadEmail(
        user!.email!,
        user!.displayName || user!.email!.split('@')[0],
        items,
        orderNumber
      );
      
      if (emailSuccess) {
        setEmailSent(true);
        clear();
        
        // Redirigir a página de éxito después de 2 segundos
        setTimeout(() => {
          navigate('/success?type=free&orderNumber=' + orderNumber);
        }, 2000);
      } else {
        alert('Error al enviar el email con los enlaces de descarga. Por favor, contacta con soporte o inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Error al procesar la compra gratuita. Por favor, inténtalo de nuevo o contacta con soporte.');
    }
  }

  async function handlePaidProducts() {
    try {
      // Generar número de pedido para productos de pago
      const orderNumber = 'PAID-' + Date.now().toString(36).toUpperCase();
      
      // TODO: Integración con Stripe
      
      // Por ahora, simular éxito y enviar email
      alert('Procesamiento de pago no implementado aún. Simulando éxito...');
      
      const emailSuccess = await sendDownloadEmail(
        user!.email!,
        user!.displayName || user!.email!.split('@')[0],
        items,
        orderNumber
      );
      
      if (emailSuccess) {
        clear();
        navigate('/success?type=paid&orderNumber=' + orderNumber);
      }
    } catch (error) {
      alert('Error al procesar el pago. Por favor, inténtalo de nuevo.');
    }
  }

  // Si no está autenticado, mostrar mensaje
  if (!user) {
    return (
      <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
        <h1 className="text-gray-300 text-4xl md:text-6xl font-bold font-plus-jakarta mb-8">Checkout</h1>
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 max-w-md">
          <h2 className="text-yellow-400 text-xl font-semibold mb-3">Autenticación requerida</h2>
          <p className="text-yellow-300/80 mb-4">
            Debes iniciar sesión para completar tu compra y recibir los enlaces de descarga.
          </p>
          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 bg-lime-400 text-gray-950 rounded-md font-semibold hover:bg-lime-500">
              Iniciar sesión
            </Link>
            <Link to="/register" className="px-4 py-2 border border-lime-400 text-lime-400 rounded-md font-semibold hover:bg-lime-400/10">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <h1 className="text-gray-300 text-4xl md:text-6xl font-bold font-plus-jakarta mb-8">Checkout</h1>
      {items.length === 0 ? (
        <p className="text-gray-300/80">Tu carrito está vacío.</p>
      ) : (
        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl border border-white/10 p-6">
              <h2 className="text-gray-100 font-semibold mb-4">Resumen del pedido</h2>
              <ul className="divide-y divide-white/10">
                {items.map(it => (
                  <li key={it.id} className="py-3 flex justify-between items-center text-gray-300">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span>{it.name} × {it.quantity}</span>
                        {it.type === 'digital' && (
                          <span className="text-xs px-2 py-0.5 bg-purple-400/20 text-purple-300 rounded">
                            🎵 Digital
                          </span>
                        )}
                      </div>
                      {it.type === 'digital' && it.downloadUrl && (
                        <div className="text-xs text-gray-400 mt-1">
                          Recibirás el enlace de descarga por email
                        </div>
                      )}
                    </div>
                    <span className={`font-semibold ${it.price === 0 ? 'text-green-400' : 'text-lime-300'}`}>
                      {it.price === 0 ? 'GRATIS' : formatCents(it.price * it.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between text-gray-100 font-bold text-lg">
                <span>Total</span>
                <span className={isFreeOrder ? 'text-green-400' : 'text-lime-300'}>
                  {isFreeOrder ? 'GRATIS' : formatCents(totalPriceCents)}
                </span>
              </div>
              
              {/* Info adicional para productos digitales */}
              {hasDigitalProducts && (
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-300 text-sm">
                    <span>ℹ️</span>
                    <span>Los productos digitales se entregan por email tras el pago</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl border border-white/10 p-6 h-fit">
            <h2 className="text-gray-100 font-semibold mb-4">
              {isFreeOrder ? 'Descargar' : 'Pago'}
            </h2>
            
            {isFreeOrder ? (
              <>
                <p className="text-gray-300/80 text-sm mb-4">
                  Todos los productos en tu carrito son gratuitos. Al confirmar, recibirás los enlaces de descarga por email.
                </p>
                {emailSent ? (
                  <div className="w-full px-4 py-3 bg-green-600/20 border border-green-500/30 rounded-md text-center">
                    <div className="text-green-400 font-semibold mb-1">✅ ¡Email enviado!</div>
                    <div className="text-green-300/80 text-sm">Revisa tu bandeja de entrada</div>
                  </div>
                ) : (
                  <button 
                    onClick={handleCheckout}
                    disabled={loading} 
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-500 disabled:opacity-60 transition-all"
                  >
                    {loading ? '📧 Enviando email...' : '📧 Enviar enlaces por email'}
                  </button>
                )}
              </>
            ) : (
              <>
                <p className="text-gray-300/80 text-sm mb-4">
                  El pago se realiza con Stripe Checkout. Serás redirigido para completar la compra de forma segura.
                </p>
                <button 
                  onClick={handleCheckout}
                  disabled={loading} 
                  className="w-full px-4 py-3 bg-lime-400 text-gray-950 rounded-md font-semibold hover:bg-lime-500 disabled:opacity-60 transition-all"
                >
                  {loading ? '⏳ Redirigiendo…' : '💳 Pagar con Stripe'}
                </button>
              </>
            )}
            
            <div className="mt-4 text-xs text-gray-400">
              Usuario: {user.email}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
