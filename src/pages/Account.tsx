import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { doc, setDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { updatePassword as firebaseUpdatePassword, sendEmailVerification } from 'firebase/auth';
import { db } from '../lib/firebase';
import { formatCents } from '../utils/format';
import type { Order } from '../utils/orders';

interface UserProfile {
  displayName: string;
  phone: string;
  country: string;
  musicGenre: string;
  experience: string;
  website: string;
  instagram: string;
  biography: string;
}

const Account: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const { totalItems } = useCart();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'purchases' | 'preferences'>('profile');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  
  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  
  // Profile form state
  const [profileData, setProfileData] = useState<UserProfile>({
    displayName: profile?.displayName || '',
    phone: profile?.phone || '',
    country: '',
    musicGenre: '',
    experience: '',
    website: '',
    instagram: '',
    biography: '',
  });

  // Security form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // SEO Optimization
  useEffect(() => {
    document.title = user ? `Mi Cuenta - ${user.email} | DiegoDPL Shop` : "Mi Cuenta | DiegoDPL Shop";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Gestiona tu cuenta de DiegoDPL Shop. Actualiza tu perfil musical, revisa tus compras de sample libraries y personaliza tu experiencia.'
      );
    }

    // Structured Data para User Account
    if (user) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "UserAccount",
        "name": profileData.displayName || user.email,
        "email": user.email,
        "description": "Cuenta de usuario en DiegoDPL Shop",
        "url": "https://diegodpl.com/account",
        "provider": {
          "@type": "Organization",
          "name": "DiegoDPL Shop",
          "url": "https://diegodpl.com"
        }
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
  }, [user, profileData.displayName]);

  // Show message temporarily
  const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 5000);
  };

  if (!user) {
    return (
      <div className="bg-gray-950 min-h-screen pt-20">
        <div className="container mx-auto px-4 lg:px-6 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-100 mb-4">Acceso Requerido</h1>
            <p className="text-gray-400 mb-8">
              Necesitas iniciar sesión para acceder a tu cuenta y gestionar tu perfil musical.
            </p>
            <div className="space-y-3">
              <Link 
                to="/login" 
                className="block w-full px-6 py-3 bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-gray-900 font-bold rounded-lg transition-all duration-300"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                className="block w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg border border-gray-600 transition-colors"
              >
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const saveProfile = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'users', user.uid), profileData, { merge: true });
      showMessage('success', '¡Perfil actualizado correctamente! 🎉');
    } catch (error: any) {
      showMessage('error', error.message || 'No se pudo guardar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const updateUserPassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'Las contraseñas no coinciden');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showMessage('error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setSaving(true);
    try {
      await firebaseUpdatePassword(user, passwordData.newPassword);
      showMessage('success', '¡Contraseña actualizada correctamente!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      showMessage('error', error.message || 'No se pudo actualizar la contraseña');
    } finally {
      setSaving(false);
    }
  };

  const resendVerification = async () => {
    try {
      await sendEmailVerification(user);
      showMessage('info', 'Email de verificación enviado. Revisa tu bandeja de entrada.');
    } catch (error: any) {
      showMessage('error', 'No se pudo enviar el email de verificación');
    }
  };

  // Load orders when purchases tab is active
  useEffect(() => {
    if (activeTab === 'purchases' && user && orders.length === 0) {
      loadOrders();
    }
  }, [activeTab, user]);

  // Auto-switch to purchases tab if user has orders
  useEffect(() => {
    const checkForOrders = async () => {
      if (user && orders.length === 0 && activeTab === 'profile') {
        try {
          const ordersQuery = query(
            collection(db, 'orders'),
            where('userId', '==', user.uid),
            limit(1)
          );
          const snapshot = await getDocs(ordersQuery);
          if (!snapshot.empty) {
            setActiveTab('purchases');
          }
        } catch (error) {
          // Silently fail, stay on profile tab
        }
      }
    };
    checkForOrders();
  }, [user]);

  async function loadOrders() {
    try {
      setOrdersLoading(true);
      setOrdersError(null);
      
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
        setOrdersError('Configurando base de datos... Inténtalo de nuevo en unos minutos.');
      } else {
        setOrdersError('Error al cargar el historial de compras');
      }
    } finally {
      setOrdersLoading(false);
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

  const tabs = [
    { id: 'profile', label: 'Perfil Musical', icon: '🎵' },
    { id: 'security', label: 'Seguridad', icon: '🔒' },
    { id: 'purchases', label: 'Mis Compras', icon: '🛒' },
    { id: 'preferences', label: 'Preferencias', icon: '⚙️' }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-20 pb-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent font-['Plus_Jakarta_Sans'] mb-4">
                  Mi Cuenta 👤
                </h1>
                <div className="space-y-2">
                  <p className="text-xl text-gray-300">
                    ¡Hola <span className="text-lime-300 font-bold">{profileData.displayName || 'Músico'}</span>! 
                  </p>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {!user.emailVerified && (
                  <button
                    onClick={resendVerification}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Verificar Email
                  </button>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg border border-gray-600 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-950 min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Navigation Tabs */}
            <div className="mb-8">
              <div className="border-b border-gray-700">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'border-lime-400 text-lime-400'
                          : 'border-transparent text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Message Display */}
            {msg && (
              <div className={`mb-8 p-4 rounded-lg border ${
                msg.type === 'success' ? 'bg-green-900/50 border-green-500/50 text-green-300' :
                msg.type === 'error' ? 'bg-red-900/50 border-red-500/50 text-red-300' :
                'bg-blue-900/50 border-blue-500/50 text-blue-300'
              }`}>
                <div className="flex items-center gap-2">
                  <span>
                    {msg.type === 'success' ? '✅' : msg.type === 'error' ? '❌' : 'ℹ️'}
                  </span>
                  {msg.text}
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main Content Area */}
              <div className="lg:col-span-2">
                
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-100 mb-6">Perfil Musical</h2>
                    
                    <form onSubmit={(e) => { e.preventDefault(); saveProfile(); }} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nombre Artístico *
                          </label>
                          <input
                            type="text"
                            value={profileData.displayName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                            placeholder="Tu nombre artístico"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                          </label>
                          <div className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-400 flex items-center justify-between">
                            <span>{user.email}</span>
                            {!user.emailVerified && (
                              <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded">
                                No verificado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                            placeholder="+34 600 000 000"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            País
                          </label>
                          <select
                            value={profileData.country}
                            onChange={(e) => setProfileData(prev => ({ ...prev, country: e.target.value }))}
                            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                          >
                            <option value="">Selecciona tu país</option>
                            <option value="ES">España</option>
                            <option value="MX">México</option>
                            <option value="AR">Argentina</option>
                            <option value="CO">Colombia</option>
                            <option value="PE">Perú</option>
                            <option value="CL">Chile</option>
                            <option value="US">Estados Unidos</option>
                            <option value="other">Otro</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Género Musical Principal
                          </label>
                          <select
                            value={profileData.musicGenre}
                            onChange={(e) => setProfileData(prev => ({ ...prev, musicGenre: e.target.value }))}
                            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                          >
                            <option value="">Selecciona tu género</option>
                            <option value="electronic">Electrónica</option>
                            <option value="hip-hop">Hip-Hop</option>
                            <option value="reggaeton">Reggaeton</option>
                            <option value="pop">Pop</option>
                            <option value="rock">Rock</option>
                            <option value="latin">Latino</option>
                            <option value="jazz">Jazz</option>
                            <option value="classical">Clásica</option>
                            <option value="experimental">Experimental</option>
                            <option value="other">Otro</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Experiencia
                          </label>
                          <select
                            value={profileData.experience}
                            onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                          >
                            <option value="">Nivel de experiencia</option>
                            <option value="beginner">Principiante (0-1 años)</option>
                            <option value="intermediate">Intermedio (2-5 años)</option>
                            <option value="advanced">Avanzado (5-10 años)</option>
                            <option value="professional">Profesional (10+ años)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Sitio Web
                          </label>
                          <input
                            type="url"
                            value={profileData.website}
                            onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                            placeholder="https://tumusica.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Instagram
                          </label>
                          <input
                            type="text"
                            value={profileData.instagram}
                            onChange={(e) => setProfileData(prev => ({ ...prev, instagram: e.target.value }))}
                            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                            placeholder="@tuusuario"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Biografía Musical
                        </label>
                        <textarea
                          value={profileData.biography}
                          onChange={(e) => setProfileData(prev => ({ ...prev, biography: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 resize-vertical"
                          placeholder="Cuéntanos sobre tu trayectoria musical, influencias, proyectos actuales..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={saving}
                        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 disabled:opacity-50 text-gray-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                      >
                        {saving ? 'Guardando...' : 'Guardar Perfil'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-100 mb-6">Seguridad de la Cuenta</h2>
                    
                    <form onSubmit={(e) => { e.preventDefault(); updateUserPassword(); }} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nueva Contraseña
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                          placeholder="Mínimo 6 caracteres"
                          minLength={6}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Confirmar Nueva Contraseña
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-4 py-3 bg-gray-950/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                          placeholder="Repite la nueva contraseña"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={saving || !passwordData.newPassword || !passwordData.confirmPassword}
                        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold rounded-lg transition-all duration-300 disabled:transform-none"
                      >
                        {saving ? 'Actualizando...' : 'Actualizar Contraseña'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Purchases Tab */}
                {activeTab === 'purchases' && (
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-100">Historial de Compras</h2>
                      {orders.length > 0 && (
                        <button
                          onClick={loadOrders}
                          disabled={ordersLoading}
                          className="px-4 py-2 bg-lime-600 hover:bg-lime-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
                        >
                          {ordersLoading ? 'Cargando...' : 'Actualizar'}
                        </button>
                      )}
                    </div>
                    
                    {ordersLoading && orders.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center animate-pulse">
                          <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-300 mb-2">Cargando compras...</h3>
                        <p className="text-gray-400">
                          Obteniendo tu historial de compras, por favor espera.
                        </p>
                      </div>
                    )}

                    {ordersError && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-red-300 mb-2">Error al cargar</h3>
                        <p className="text-gray-400 mb-6">{ordersError}</p>
                        <button
                          onClick={loadOrders}
                          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Intentar de nuevo
                        </button>
                      </div>
                    )}

                    {!ordersLoading && !ordersError && orders.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-300 mb-2">Sin compras aún</h3>
                        <p className="text-gray-400 mb-6">
                          Cuando realices tu primera compra, aparecerá aquí tu historial completo.
                        </p>
                        <Link 
                          to="/catalog" 
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-gray-900 font-bold rounded-lg transition-all duration-300"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                          </svg>
                          Explorar Catálogo
                        </Link>
                      </div>
                    )}

                    {!ordersLoading && !ordersError && orders.length > 0 && (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="bg-gray-950/50 border border-gray-600 rounded-lg p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-bold text-gray-100">
                                    Orden #{order.orderNumber}
                                  </h3>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} border ${getStatusColor(order.status).replace('text-', 'border-')}`}>
                                    {getStatusText(order.status)}
                                  </span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                  {formatDate(order.createdAt)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-lime-300">
                                  {formatCents(order.totalAmount)}
                                </p>
                                {order.paymentMethod && (
                                  <p className="text-gray-400 text-sm capitalize">
                                    {order.paymentMethod}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                                  <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-gray-100 font-medium">{item.name}</h4>
                                    <p className="text-gray-400 text-sm">
                                      Cantidad: {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-gray-100 font-medium">
                                      {formatCents(item.price * item.quantity)}
                                    </p>
                                    {item.quantity > 1 && (
                                      <p className="text-gray-400 text-sm">
                                        {formatCents(item.price)} c/u
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Customer Info */}
                            <div className="mt-4 pt-4 border-t border-gray-600">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-400">Email:</span>
                                  <span className="text-gray-300 ml-2">{order.userEmail}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400">Nombre:</span>
                                  <span className="text-gray-300 ml-2">{order.userName}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {orders.length >= 50 && (
                          <div className="text-center py-6">
                            <p className="text-gray-400 text-sm">
                              Mostrando las 50 compras más recientes
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-100 mb-6">Preferencias</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-950/50 rounded-lg border border-gray-600">
                        <div>
                          <h3 className="text-lg font-medium text-gray-100">Notificaciones por email</h3>
                          <p className="text-gray-400 text-sm">Recibe noticias sobre nuevos samples y ofertas</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 text-lime-400 rounded focus:ring-lime-400" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-950/50 rounded-lg border border-gray-600">
                        <div>
                          <h3 className="text-lg font-medium text-gray-100">Recomendaciones personalizadas</h3>
                          <p className="text-gray-400 text-sm">Sugerencias basadas en tu género musical</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 text-lime-400 rounded focus:ring-lime-400" defaultChecked />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Account Stats */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-100 mb-4">Tu Actividad</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Samples en carrito</span>
                      <span className="text-lime-300 font-bold">{totalItems}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Compras realizadas</span>
                      <span className="text-lime-300 font-bold">{orders.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Cuenta desde</span>
                      <span className="text-gray-300">{user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Hoy'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-100 mb-4">Acciones Rápidas</h3>
                  <div className="space-y-3">
                    <Link 
                      to="/catalog" 
                      className="block w-full px-4 py-3 bg-lime-500/10 hover:bg-lime-500/20 text-lime-300 font-medium rounded-lg border border-lime-500/30 transition-colors text-center"
                    >
                      Ver Catálogo
                    </Link>
                    {totalItems > 0 && (
                      <Link 
                        to="/cart" 
                        className="block w-full px-4 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-medium rounded-lg border border-emerald-500/30 transition-colors text-center"
                      >
                        Ver Carrito ({totalItems})
                      </Link>
                    )}
                    <Link 
                      to="/contact" 
                      className="block w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium rounded-lg border border-gray-600 transition-colors text-center"
                    >
                      Contactar Soporte
                    </Link>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl border border-blue-700/50 p-6">
                  <h3 className="text-lg font-bold text-blue-300 mb-4">Completa tu Perfil</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className={user.emailVerified ? 'text-green-400' : 'text-gray-400'}>
                        {user.emailVerified ? '✅' : '⭕'}
                      </span>
                      <span className="text-gray-300">Email verificado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={profileData.displayName ? 'text-green-400' : 'text-gray-400'}>
                        {profileData.displayName ? '✅' : '⭕'}
                      </span>
                      <span className="text-gray-300">Nombre artístico</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={profileData.musicGenre ? 'text-green-400' : 'text-gray-400'}>
                        {profileData.musicGenre ? '✅' : '⭕'}
                      </span>
                      <span className="text-gray-300">Género musical</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-blue-800/30 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${
                          (user.emailVerified ? 33 : 0) + 
                          (profileData.displayName ? 33 : 0) + 
                          (profileData.musicGenre ? 34 : 0)
                        }%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
