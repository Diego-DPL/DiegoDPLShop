import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { formatCents } from '../utils/format';
import type { Order, OrderSummary } from '../utils/orders';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      let ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      
      if (filter !== 'all') {
        ordersQuery = query(
          collection(db, 'orders'),
          where('status', '==', filter),
          orderBy('createdAt', 'desc')
        );
      }

      const snapshot = await getDocs(ordersQuery);
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];

      setOrders(ordersData);
      generateSummary(ordersData);
    } catch (err: any) {
      console.error('Error al cargar órdenes:', err);
      setError('Error al cargar las órdenes');
    } finally {
      setLoading(false);
    }
  }

  function generateSummary(ordersData: Order[]) {
    const completedOrders = ordersData.filter(order => order.status === 'completed');
    
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    const digitalSales = completedOrders.filter(order => 
      order.items.some(item => item.type === 'digital')
    ).length;
    
    const physicalSales = completedOrders.filter(order => 
      order.items.some(item => item.type === 'physical')
    ).length;

    // Calcular productos más vendidos
    const productSales: { [key: string]: { name: string; totalSales: number; revenue: number } } = {};
    
    completedOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.id]) {
          productSales[item.id] = {
            name: item.name,
            totalSales: 0,
            revenue: 0
          };
        }
        productSales[item.id].totalSales += item.quantity;
        productSales[item.id].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.entries(productSales)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 10);

    setSummary({
      totalOrders: completedOrders.length,
      totalRevenue,
      digitalSales,
      physicalSales,
      topProducts
    });
  }

  useEffect(() => {
    loadOrders();
  }, [filter]);

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

  function getStatusColor(status: string) {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
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

  if (loading) {
    return (
      <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-100 mb-8">Panel de Órdenes</h1>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400">Cargando órdenes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4 lg:mb-0">Panel de Órdenes</h1>
          
          <div className="flex items-center gap-4">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-3 py-2"
            >
              <option value="all">Todas las órdenes</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
              <option value="failed">Fallidas</option>
            </select>
            <button 
              onClick={loadOrders}
              className="bg-lime-400 text-gray-950 px-4 py-2 rounded-lg font-semibold hover:bg-lime-500 transition-colors"
            >
              Actualizar
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-xl p-6 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Resumen de estadísticas */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Órdenes</h3>
              <p className="text-3xl font-bold text-lime-400">{summary.totalOrders}</p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Ingresos Totales</h3>
              <p className="text-3xl font-bold text-lime-400">{formatCents(summary.totalRevenue)}</p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Ventas Digitales</h3>
              <p className="text-3xl font-bold text-blue-400">{summary.digitalSales}</p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Ventas Físicas</h3>
              <p className="text-3xl font-bold text-purple-400">{summary.physicalSales}</p>
            </div>
          </div>
        )}

        {/* Top productos */}
        {summary && summary.topProducts.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Productos Más Vendidos</h3>
            <div className="space-y-3">
              {summary.topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lime-400 font-bold">#{index + 1}</span>
                    <span className="text-gray-200 font-semibold">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-200">{product.totalSales} vendidos</div>
                    <div className="text-sm text-gray-400">{formatCents(product.revenue)} ingresos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lista de órdenes */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-xl font-semibold text-gray-100">
              Órdenes Recientes ({orders.length})
            </h3>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">No hay órdenes que mostrar</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left p-4 text-gray-300">Orden</th>
                    <th className="text-left p-4 text-gray-300">Cliente</th>
                    <th className="text-left p-4 text-gray-300">Productos</th>
                    <th className="text-left p-4 text-gray-300">Total</th>
                    <th className="text-left p-4 text-gray-300">Estado</th>
                    <th className="text-left p-4 text-gray-300">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-4">
                        <div className="font-semibold text-gray-200">#{order.orderNumber}</div>
                        <div className="text-sm text-gray-400">{order.id}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-200">{order.userName}</div>
                        <div className="text-sm text-gray-400">{order.userEmail}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-200">{order.items.length} productos</div>
                        <div className="text-sm text-gray-400">
                          {order.items.map(item => item.name).join(', ').substring(0, 50)}
                          {order.items.map(item => item.name).join(', ').length > 50 && '...'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-lime-400">
                          {order.totalAmount === 0 ? 'GRATIS' : formatCents(order.totalAmount)}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(order.status)} mr-2`}></span>
                        <span className="text-gray-200">{getStatusText(order.status)}</span>
                      </td>
                      <td className="p-4 text-gray-400">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
