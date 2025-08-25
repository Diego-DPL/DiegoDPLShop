import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCart } from '../context/CartContext';
import { formatCents } from '../utils/format';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  previewUrl?: string;
  downloadUrl?: string;
  type?: 'digital' | 'physical';
  active?: boolean;
  genre?: string;
  bpm?: number;
  key?: string;
  tags?: string[];
  duration?: number;
}

const Catalog: React.FC = () => {
  const { add } = useCart();
  const [allItems, setAllItems] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para filtros y búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  // Estados para el reproductor elegante
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<{[key: string]: number}>({});
  const [audioDuration, setAudioDuration] = useState<{[key: string]: number}>({});
  const audioRefs = useRef<{[key: string]: HTMLAudioElement}>({});
  
  // Obtener géneros únicos para el filtro
  const uniqueGenres = [...new Set(allItems.map(item => item.genre).filter(Boolean))];

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, 'products'));
        const rows = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Product[];
        const activeProducts = rows.filter((p: Product) => p.active);
        setAllItems(activeProducts);
        setFilteredItems(activeProducts);
      } finally { 
        setLoading(false); 
      }
    }
    load();
  }, []);

  // Efecto para filtrar y ordenar productos
  useEffect(() => {
    let filtered = [...allItems];

    // Filtro por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filtro por género
    if (selectedGenre) {
      filtered = filtered.filter(item => item.genre === selectedGenre);
    }

    // Filtro por tipo
    if (selectedType) {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Filtro por precio
    if (priceRange === 'free') {
      filtered = filtered.filter(item => item.price === 0);
    } else if (priceRange === 'paid') {
      filtered = filtered.filter(item => item.price > 0);
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'newest':
        default:
          return 0; // Mantener orden original por defecto
      }
    });

    setFilteredItems(filtered);
  }, [allItems, searchQuery, selectedGenre, selectedType, priceRange, sortBy]);

  // Limpiar audio al cambiar de página
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  // Función para crear o obtener referencia de audio
  const getAudioRef = (productId: string, previewUrl: string) => {
    if (!audioRefs.current[productId]) {
      const audio = new Audio(previewUrl);
      audio.preload = 'metadata';
      
      audio.addEventListener('loadedmetadata', () => {
        setAudioDuration(prev => ({ ...prev, [productId]: audio.duration }));
      });
      
      audio.addEventListener('timeupdate', () => {
        setAudioProgress(prev => ({ ...prev, [productId]: audio.currentTime }));
      });
      
      audio.addEventListener('ended', () => {
        setCurrentlyPlaying(null);
        setAudioProgress(prev => ({ ...prev, [productId]: 0 }));
      });
      
      audioRefs.current[productId] = audio;
    }
    return audioRefs.current[productId];
  };

  // Función para alternar play/pause
  const togglePlay = (productId: string, previewUrl: string) => {
    const audio = getAudioRef(productId, previewUrl);
    
    if (currentlyPlaying === productId) {
      // Pausar audio actual
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      // Pausar cualquier otro audio que esté reproduciéndose
      if (currentlyPlaying) {
        const currentAudio = audioRefs.current[currentlyPlaying];
        if (currentAudio) {
          currentAudio.pause();
        }
      }
      
      // Reproducir el nuevo audio
      audio.play();
      setCurrentlyPlaying(productId);
    }
  };

  // Función para buscar en el audio
  const seekAudio = (productId: string, percentage: number) => {
    const audio = audioRefs.current[productId];
    if (audio && audioDuration[productId]) {
      const newTime = (percentage / 100) * audioDuration[productId];
      audio.currentTime = newTime;
      setAudioProgress(prev => ({ ...prev, [productId]: newTime }));
    }
  };

  // Función para limpiar filtros
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedType('');
    setPriceRange('all');
    setSortBy('newest');
  };

  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      {/* Header con SEO optimizado */}
      <div className="mb-8">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 text-4xl md:text-6xl font-bold font-plus-jakarta mb-6">
          🎵 Catálogo Musical
        </h1>
        <p className="text-gray-300/90 text-lg md:text-xl max-w-4xl leading-relaxed">
          Descubre la colección completa de <span className="text-purple-300 font-semibold">beats profesionales</span>, <span className="text-pink-300 font-semibold">remixes exclusivos</span> y <span className="text-purple-300 font-semibold">sample libraries</span> de DiegoDPL. 
          <br className="hidden md:block" />
          <span className="text-gray-400 mt-2 block">Encuentra el sonido perfecto para tu próximo proyecto musical.</span>
        </p>
      </div>

      {/* Barra de búsqueda principal y botón de filtros */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Buscador Principal Mejorado */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Busca beats, remixes, géneros..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Botón de Filtros y Ordenar */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                showFilters 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros
            </button>
            
            {/* Ordenar rápido */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'newest')}
              className="px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <option value="newest">🆕 Recientes</option>
              <option value="name">🔤 A-Z</option>
              <option value="price">💰 Precio</option>
            </select>
          </div>
        </div>
      </div>

      {/* Panel de Filtros Colapsable */}
      {showFilters && (
        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 mb-8 animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {/* Filtro por Género */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-3">
                🎼 Género Musical
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <option value="">Todos los géneros</option>
                {uniqueGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Tipo */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-3">
                � Tipo de Producto
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <option value="">Todos los tipos</option>
                <option value="digital">� Digital</option>
                <option value="physical">� Físico</option>
              </select>
            </div>

            {/* Filtro por Precio */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-3">
                � Rango de Precio
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as 'all' | 'free' | 'paid')}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <option value="all">Todos los precios</option>
                <option value="free">🆓 Gratis</option>
                <option value="paid">� De pago</option>
              </select>
            </div>

            {/* Botón limpiar filtros */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 rounded-lg transition-all duration-200 font-semibold"
              >
                🧹 Limpiar
              </button>
            </div>
          </div>

          {/* Contador de resultados mejorado */}
          <div className="pt-4 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Mostrando <span className="text-purple-400 font-bold text-base">{filteredItems.length}</span> de <span className="text-gray-300 font-semibold">{allItems.length}</span> productos
              </p>
              {(searchQuery || selectedGenre || selectedType || priceRange !== 'all') && (
                <span className="text-xs text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                  Filtros activos
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading State mejorado */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-500/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="text-center">
              <h3 className="text-gray-200 text-xl font-semibold mb-2">Cargando catálogo musical</h3>
              <p className="text-gray-400">Preparando los mejores beats para ti...</p>
            </div>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        /* Estado vacío mejorado */
        <div className="text-center py-24">
          <div className="mb-8">
            <div className="text-8xl mb-6 opacity-50">🎵</div>
            <h3 className="text-gray-200 text-2xl font-bold mb-4">No se encontraron tracks</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
              {searchQuery || selectedGenre || selectedType || priceRange !== 'all' 
                ? 'Intenta ajustar los filtros para encontrar lo que buscas'
                : 'Parece que no hay productos disponibles en este momento'
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {(searchQuery || selectedGenre || selectedType || priceRange !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/25"
              >
                🧹 Limpiar todos los filtros
              </button>
            )}
            
            <button
              onClick={() => setSearchQuery('')}
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl transition-all duration-300 font-semibold"
            >
              🔍 Nueva búsqueda
            </button>
          </div>
        </div>
      ) : (
        /* Grid de productos mejorado */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((product: Product) => (
            <div key={product.id} className="bg-gray-900/70 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden flex flex-col hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 group hover:-translate-y-1">
              {/* Imagen cuadrada con overlay de preview */}
              <div className="aspect-square bg-gray-800 relative cursor-pointer overflow-hidden">
                <img 
                  src={product.imageUrl || '/vite.svg'} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Overlay de cristal con controles de audio */}
                {product.type === 'digital' && product.previewUrl && (
                  <div 
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
                    onClick={() => togglePlay(product.id, product.previewUrl!)}
                  >
                    {/* Efecto de cristal mejorado */}
                    <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-white/10 via-purple-500/10 to-pink-500/10"></div>
                    
                    {/* Botón de play/pause con efecto cristal premium */}
                    <div className="relative z-10 w-24 h-24 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 flex items-center justify-center shadow-2xl hover:bg-white/25 transition-all duration-300 hover:scale-110 hover:border-purple-300/60">
                      {currentlyPlaying === product.id ? (
                        // Icono de pausa mejorado
                        <div className="flex gap-2">
                          <div className="w-3 h-8 bg-white/90 rounded-sm shadow-lg"></div>
                          <div className="w-3 h-8 bg-white/90 rounded-sm shadow-lg"></div>
                        </div>
                      ) : (
                        // Icono de play mejorado
                        <div className="w-0 h-0 border-l-[14px] border-l-white/90 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1 drop-shadow-lg"></div>
                      )}
                    </div>
                    
                    {/* Barra de progreso interactiva premium */}
                    {currentlyPlaying === product.id && audioDuration[product.id] && (
                      <div className="absolute bottom-6 left-6 right-6">
                        <div 
                          className="h-2.5 bg-white/20 rounded-full backdrop-blur-md overflow-hidden cursor-pointer group/progress border border-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                            seekAudio(product.id, percentage);
                          }}
                        >
                          <div 
                            className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 rounded-full transition-all duration-100 group-hover/progress:from-purple-300 group-hover/progress:via-pink-300 group-hover/progress:to-purple-500 shadow-lg"
                            style={{ width: `${(audioProgress[product.id] / audioDuration[product.id]) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-white/90 mt-3 font-medium">
                          <span>{Math.floor(audioProgress[product.id] || 0)}s</span>
                          <span>{Math.floor(audioDuration[product.id] || 0)}s</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Indicador de audio disponible premium */}
                    <div className="absolute top-4 left-4 px-3 py-2 bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md text-white text-sm font-bold rounded-full border border-white/20 shadow-xl">
                      🎵 Preview
                    </div>
                  </div>
                )}
                
                {/* Badge de tipo de producto premium */}
                {product.type && (
                  <div className={`absolute top-4 right-4 px-3 py-2 rounded-full text-sm font-bold shadow-xl border backdrop-blur-md ${
                    product.type === 'digital' 
                      ? 'bg-gradient-to-r from-purple-600/90 to-purple-700/90 text-white border-purple-400/30' 
                      : 'bg-gradient-to-r from-blue-600/90 to-blue-700/90 text-white border-blue-400/30'
                  }`}>
                    {product.type === 'digital' ? '🎵 Digital' : '📦 Físico'}
                  </div>
                )}

                {/* Badge de precio GRATIS premium */}
                {product.price === 0 && (
                  <div className="absolute bottom-4 right-4 px-3 py-2 bg-gradient-to-r from-green-500/90 to-emerald-600/90 backdrop-blur-md text-white text-sm font-bold rounded-full border border-green-400/30 shadow-xl">
                    🆓 GRATIS
                  </div>
                )}
              </div>
              
              {/* Contenido de la card premium */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="flex-1">
                  <h3 className="text-gray-100 text-xl font-bold mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300 leading-tight">
                    {product.name}
                  </h3>
                  
                  {/* Información musical mejorada */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.genre && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-gray-700/60 to-gray-600/60 backdrop-blur-sm text-gray-300 text-xs font-medium rounded-lg border border-gray-600/30">
                        🎼 {product.genre}
                      </span>
                    )}
                    {product.bpm && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm text-orange-300 text-xs font-medium rounded-lg border border-orange-600/30">
                        ⚡ {product.bpm} BPM
                      </span>
                    )}
                    {product.key && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm text-blue-300 text-xs font-medium rounded-lg border border-blue-600/30">
                        🎹 {product.key}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {product.description || 'Beat profesional de alta calidad, perfecto para tu próximo proyecto musical. Descarga inmediata tras la compra.'}
                  </p>
                </div>
                
                {/* Footer de la card premium */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/40">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                      {product.price === 0 ? 'GRATIS' : formatCents(product.price)}
                    </span>
                    {product.price > 0 && (
                      <span className="text-xs text-gray-500">Descarga instantánea</span>
                    )}
                  </div>
                  <button
                    onClick={() => add({ 
                      id: product.id, 
                      name: product.name, 
                      price: product.price, 
                      image: product.imageUrl,
                      type: product.type,
                      downloadUrl: product.downloadUrl 
                    })}
                    className="px-6 py-3 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-gray-950 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-lime-500/30 text-sm"
                  >
                    🛒 Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
