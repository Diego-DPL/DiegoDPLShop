import React, { useMemo } from 'react';

const Success: React.FC = () => {
  // Detectar tipo de compra y número de orden desde URL params
  const { purchaseType, orderNumber } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      purchaseType: params.get('type') || 'paid',
      orderNumber: params.get('orderNumber') || 'N/A'
    };
  }, []);

  const isFree = purchaseType === 'free';

  return (
    <div className="bg-gray-950 min-h-[60vh] py-24 px-4 md:px-8 lg:px-16 text-center">
      <div className={`text-6xl mb-6 ${isFree ? 'text-green-400' : 'text-lime-300'}`}>
        {isFree ? '🎉' : '✅'}
      </div>
      
      <h1 className={`text-4xl md:text-6xl font-bold font-plus-jakarta mb-4 ${isFree ? 'text-green-300' : 'text-lime-300'}`}>
        {isFree ? '¡Descarga completada!' : '¡Gracias por tu compra!'}
      </h1>
      
      <div className="max-w-2xl mx-auto space-y-4">
        <p className="text-gray-300/90 text-lg">
          {isFree 
            ? 'Recibirás un email con los enlaces de descarga de tus productos gratuitos.' 
            : 'Tu pago se ha procesado correctamente. Recibirás un email con los enlaces de descarga.'}
        </p>
        
        {/* Número de orden */}
        <div className="text-gray-400 text-sm">
          Orden: <span className="font-mono text-lime-300">{orderNumber}</span>
        </div>
        
        <div className={`p-4 rounded-lg border ${
          isFree 
            ? 'bg-green-900/20 border-green-500/30 text-green-300' 
            : 'bg-blue-900/20 border-blue-500/30 text-blue-300'
        }`}>
          <h3 className="font-semibold mb-2">📧 Próximos pasos:</h3>
          <ul className="text-sm space-y-1 text-left max-w-md mx-auto">
            <li>• Revisa tu bandeja de entrada (y spam)</li>
            <li>• Los enlaces de descarga están listos para usar</li>
            <li>• Si no recibes el email en 5 minutos, contáctame</li>
            {!isFree && <li>• Recibirás también una factura de tu compra</li>}
            <li>• Guarda este número de orden para referencia: <span className="font-mono text-xs">{orderNumber}</span></li>
          </ul>
        </div>
      </div>
      
      <div className="flex gap-4 justify-center mt-8">
        <a 
          href="/" 
          className={`px-6 py-3 rounded-md font-semibold transition-colors ${
            isFree
              ? 'bg-green-600 text-white hover:bg-green-500'
              : 'bg-lime-400 text-gray-950 hover:bg-lime-500'
          }`}
        >
          Volver al inicio
        </a>
        <a 
          href="/catalog" 
          className="px-6 py-3 border border-gray-600 text-gray-300 rounded-md font-semibold hover:bg-gray-800"
        >
          Ver más productos
        </a>
      </div>
    </div>
  );
};

export default Success;
