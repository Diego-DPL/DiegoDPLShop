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
      <div className="mb-12">
        <h1 className="text-gray-100 text-4xl md:text-6xl font-bold font-plus-jakarta mb-4">
          🎵 Catálogo Musical
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl">
          Descubre la colección completa de <strong>beats profesionales</strong>, <strong>remixes exclusivos</strong> y <strong>sample libraries</strong> de DiegoDPL. 
          Encuentra el sonido perfecto para tu próximo proyecto musical.
        </p>
      </div>

      {/* Panel de Filtros y Búsqueda */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Buscador Principal */}
          <div className="lg:col-span-2">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              🔍 Buscar tracks
            </label>
            <input
              type="text"
              placeholder="Busca por nombre, género, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Filtro por Género */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              🎼 Género
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <option value="">Todos los géneros</option>
              {uniqueGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Tipo */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              📦 Tipo
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <option value="">Todos los tipos</option>
              <option value="digital">🎵 Digital</option>
              <option value="physical">📦 Físico</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por Precio */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              💰 Precio
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as 'all' | 'free' | 'paid')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <option value="all">Todos los precios</option>
              <option value="free">🆓 Gratis</option>
              <option value="paid">💳 De pago</option>
            </select>
          </div>

          {/* Ordenar por */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              🔄 Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'newest')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <option value="newest">🆕 Más recientes</option>
              <option value="name">🔤 Nombre A-Z</option>
              <option value="price">💰 Precio menor</option>
            </select>
          </div>

          {/* Botón limpiar filtros */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-all duration-200 font-medium"
            >
              🧹 Limpiar filtros
            </button>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Mostrando <span className="text-purple-400 font-semibold">{filteredItems.length}</span> de {allItems.length} productos
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-300 text-lg">Cargando catálogo musical...</span>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        /* Estado vacío */
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-gray-300 text-xl font-semibold mb-2">No se encontraron resultados</h3>
          <p className="text-gray-400 mb-6">Intenta ajustar los filtros o la búsqueda</p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 font-semibold"
          >
            🧹 Limpiar filtros
          </button>
        </div>
      ) : (
        /* Grid de productos */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((product: Product) => (
            <div key={product.id} className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden flex flex-col hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group">
              {/* Imagen con overlay de preview */}
              <div className="aspect-video bg-gray-800 relative cursor-pointer overflow-hidden">
                <img 
                  src={product.imageUrl || '/vite.svg'} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                
                {/* Overlay de cristal con controles de audio */}
                {product.type === 'digital' && product.previewUrl && (
                  <div 
                    className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                    onClick={() => togglePlay(product.id, product.previewUrl!)}
                  >
                    {/* Efecto de cristal */}
                    <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-white/10 to-purple-500/10"></div>
                    
                    {/* Botón de play/pause con efecto cristal mejorado */}
                    <div className="relative z-10 w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl hover:bg-white/25 transition-all duration-300 hover:scale-110 hover:border-purple-300/50">
                      {currentlyPlaying === product.id ? (
                        // Icono de pausa mejorado
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-7 bg-white/90 rounded-sm shadow-lg"></div>
                          <div className="w-2.5 h-7 bg-white/90 rounded-sm shadow-lg"></div>
                        </div>
                      ) : (
                        // Icono de play mejorado
                        <div className="w-0 h-0 border-l-[12px] border-l-white/90 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1 drop-shadow-lg"></div>
                      )}
                    </div>
                    
                    {/* Barra de progreso interactiva mejorada */}
                    {currentlyPlaying === product.id && audioDuration[product.id] && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div 
                          className="h-2 bg-white/20 rounded-full backdrop-blur-sm overflow-hidden cursor-pointer group/progress"
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                            seekAudio(product.id, percentage);
                          }}
                        >
                          <div 
                            className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 rounded-full transition-all duration-100 group-hover/progress:from-purple-300 group-hover/progress:via-pink-300 group-hover/progress:to-purple-500"
                            style={{ width: `${(audioProgress[product.id] / audioDuration[product.id]) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-white/90 mt-2 font-medium">
                          <span>{Math.floor(audioProgress[product.id] || 0)}s</span>
                          <span>{Math.floor(audioDuration[product.id] || 0)}s</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Indicador de audio disponible mejorado */}
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/20 shadow-lg">
                      🎵 Preview
                    </div>
                  </div>
                )}
                
                {/* Badge de tipo de producto mejorado */}
                {product.type && (
                  <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border ${
                    product.type === 'digital' 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-400/30' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-400/30'
                  }`}>
                    {product.type === 'digital' ? '🎵 Digital' : '📦 Físico'}
                  </div>
                )}

                {/* Badge de precio GRATIS */}
                {product.price === 0 && (
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full border border-green-400/30 shadow-lg">
                    🆓 GRATIS
                  </div>
                )}
              </div>
              
              {/* Contenido de la card mejorado */}
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div className="flex-1">
                  <h3 className="text-gray-100 text-lg font-bold mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Información adicional */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.genre && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">
                        🎼 {product.genre}
                      </span>
                    )}
                    {product.bpm && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">
                        ⚡ {product.bpm} BPM
                      </span>
                    )}
                    {product.key && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50">
                        🎹 {product.key}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {product.description || 'Beat profesional listo para usar en tu próximo proyecto musical.'}
                  </p>
                </div>
                
                {/* Footer de la card */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <span className="text-lime-300 font-bold text-lg">
                    {product.price === 0 ? 'GRATIS' : formatCents(product.price)}
                  </span>
                  <button
                    onClick={() => add({ 
                      id: product.id, 
                      name: product.name, 
                      price: product.price, 
                      image: product.imageUrl,
                      type: product.type,
                      downloadUrl: product.downloadUrl 
                    })}
                    className="px-4 py-2.5 bg-gradient-to-r from-lime-400 to-lime-500 text-gray-950 hover:from-lime-500 hover:to-lime-600 rounded-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-lime-500/25"
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
