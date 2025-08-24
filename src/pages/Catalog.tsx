import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCart } from '../context/CartContext';
import { formatCents } from '../utils/format';

const Catalog: React.FC = () => {
  const { add } = useCart();
  const [items, setItems] = useState<Array<{ 
    id: string; 
    name: string; 
    description?: string; 
    price: number; 
    imageUrl?: string; 
    previewUrl?: string;
    downloadUrl?: string;
    type?: 'digital' | 'physical';
    active?: boolean 
  }>>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para el reproductor elegante
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<{[key: string]: number}>({});
  const [audioDuration, setAudioDuration] = useState<{[key: string]: number}>({});
  const audioRefs = useRef<{[key: string]: HTMLAudioElement}>({});

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, 'products'));
        const rows = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
        setItems(rows.filter((p: any) => p.active));
      } finally { setLoading(false); }
    }
    load();
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
        if (currentAudio) currentAudio.pause();
      }
      
      // Reproducir el nuevo audio
      audio.play();
      setCurrentlyPlaying(productId);
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <h1 className="text-gray-300 text-4xl md:text-6xl font-bold font-plus-jakarta mb-8">Catálogo</h1>
      {loading ? (
        <div className="text-gray-300">Cargando…</div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(p => (
          <div key={p.id} className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden flex flex-col">
            <div className="aspect-video bg-gray-800 relative group cursor-pointer" onClick={() => p.previewUrl && togglePlay(p.id, p.previewUrl)}>
              <img src={p.imageUrl || '/vite.svg'} alt={p.name} className="w-full h-full object-cover" />
              
              {/* Overlay de cristal con controles */}
              {p.type === 'digital' && p.previewUrl && (
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  {/* Efecto de cristal */}
                  <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
                  
                  {/* Botón de play/pause con efecto cristal */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110">
                    {currentlyPlaying === p.id ? (
                      // Icono de pausa
                      <div className="flex gap-1">
                        <div className="w-2 h-6 bg-white/90 rounded-sm"></div>
                        <div className="w-2 h-6 bg-white/90 rounded-sm"></div>
                      </div>
                    ) : (
                      // Icono de play
                      <div className="w-0 h-0 border-l-[10px] border-l-white/90 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                    )}
                  </div>
                  
                  {/* Barra de progreso elegante */}
                  {currentlyPlaying === p.id && audioDuration[p.id] && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="h-1 bg-white/20 rounded-full backdrop-blur-sm overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-100"
                          style={{ width: `${(audioProgress[p.id] / audioDuration[p.id]) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-white/80 mt-1">
                        <span>{Math.floor(audioProgress[p.id] || 0)}s</span>
                        <span>{Math.floor(audioDuration[p.id] || 0)}s</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Indicador de audio disponible */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
                    🎵 Preview
                  </div>
                </div>
              )}
              
              {/* Badge de tipo de producto */}
              {p.type && (
                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                  p.type === 'digital' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {p.type === 'digital' ? '🎵 Digital' : '📦 Físico'}
                </div>
              )}
            </div>
            
            <div className="p-4 flex-1 flex flex-col gap-3">
              <h3 className="text-gray-100 text-xl font-semibold">{p.name}</h3>
              <p className="text-gray-300/80 text-sm flex-1">{p.description}</p>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-lime-300 font-bold">
                  {p.price === 0 ? 'GRATIS' : formatCents(p.price)}
                </span>
                <button
                  onClick={() => add({ 
                    id: p.id, 
                    name: p.name, 
                    price: p.price, 
                    image: p.imageUrl,
                    type: p.type,
                    downloadUrl: p.downloadUrl 
                  })}
                  className="px-4 py-2 bg-lime-400 text-gray-950 hover:bg-lime-500 rounded-md font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  🛒 Añadir al carrito
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
