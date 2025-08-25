import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { formatCents } from '../utils/format';
import type { Order } from '../utils/orders';
import { Link } from 'react-router-dom';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadOrders();
  }, [user]);

  async function loadOrders() {
    try {
      setLoading(true);
      
      // Consulta simple sin orderBy para evitar error de índice
      const ordersQuery = query(
        collection(db, 'orders'),
        where('userId', '==', user!.uid),
        limit(50)
      );

      const snapshot = await getDocs(ordersQuery);
      let ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];

      // Ordenar en el cliente por fecha (más recientes primero)
      ordersData = ordersData.sort((a, b) => {
        const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return dateB - dateA;
      });

      setOrders(ordersData);
    } catch (err: any) {
      console.error('Error al cargar órdenes:', err);
      if (err.code === 'failed-precondition') {
        setError('Configurando base de datos... Inténtalo de nuevo en unos minutos.');
      } else {
        setError('Error al cargar el historial de compras');
      }
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'processing': return 'text-blue-400';
      case 'failed': return 'text-red-400';
      case 'cancelled': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  }

  function getStatusText(status: string) {
    switch (status) {
      case 'completed': return 'Completada';
      case 'pending': return 'Pendiente';
      case 'processing': return 'Procesando';
      case 'failed': return 'Fallida';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  }

  function formatDate(timestamp: any) {
    if (!timestamp) return 'N/A';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  }

  if (!user) {
    return (
      <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-100 mb-8">Mis Compras</h1>
          <p className="text-gray-400 mb-8">Debes iniciar sesión para ver tu historial de compras</p>
          <Link to="/login" className="bg-lime-400 text-gray-950 px-6 py-3 rounded-lg font-semibold hover:bg-lime-500 transition-colors">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4 sm:mb-0">Mis Compras</h1>
          <div className="text-gray-400">
            {orders.length} {orders.length === 1 ? 'compra' : 'compras'} registradas
          </div>
        </div>

        {loading && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400">Cargando historial de compras...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-xl p-6 mb-6">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={loadOrders}
              className="mt-4 text-lime-400 hover:text-lime-300 underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Sin compras registradas</h3>
            <p className="text-gray-400 mb-6">Aún no has realizado ninguna compra</p>
            <Link to="/catalog" className="bg-lime-400 text-gray-950 px-6 py-3 rounded-lg font-semibold hover:bg-lime-500 transition-colors">
              Explorar Catálogo
            </Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                      Pedido #{order.orderNumber}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span>{formatDate(order.createdAt)}</span>
                      <span className={`px-2 py-1 rounded-lg bg-gray-800 ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      {order.paymentMethod && (
                        <span>Pago: {order.paymentMethod}</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 text-right">
                    <div className="text-2xl font-bold text-lime-400">
                      {order.totalAmount === 0 ? 'GRATIS' : formatCents(order.totalAmount)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <h4 className="text-lg font-semibold text-gray-300 mb-3">Productos:</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-200">{item.name}</h5>
                          <div className="text-sm text-gray-400">
                            Cantidad: {item.quantity} | Tipo: {item.type === 'digital' ? 'Digital' : 'Físico'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-200">
                            {item.price === 0 ? 'GRATIS' : formatCents(item.price * item.quantity)}
                          </div>
                          {item.price > 0 && (
                            <div className="text-sm text-gray-400">
                              {formatCents(item.price)} c/u
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {order.notes && (
                  <div className="border-t border-gray-800 pt-4 mt-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Notas:</h4>
                    <p className="text-gray-300">{order.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
