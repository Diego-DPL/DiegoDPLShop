import React, { useEffect, useMemo, useRef, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../lib/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  active: boolean;
  imageUrl?: string;
  previewUrl?: string; // URL del MP3 de preview
  downloadUrl?: string; // Enlace de descarga del producto completo
  type: 'digital' | 'physical'; // Tipo de producto
  createdAt?: any;
};

const emptyProduct: Product = { 
  id: '', 
  name: '', 
  description: '', 
  price: 0, 
  active: true, 
  type: 'digital' 
};

const AdminProducts: React.FC = () => {
  const { isAdmin } = useAuth();
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product>(emptyProduct);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [audioUploadError, setAudioUploadError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'products'));
      const snap = await getDocs(q);
      const rows = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Product[];
      setItems(rows);
      setLoading(false);
    }
    if (isAdmin) load();
  }, [isAdmin]);

  function startCreate() {
    setEditing({ ...emptyProduct, id: crypto.randomUUID() });
  }

  function startEdit(p: Product) {
    setEditing({ ...p });
  }

  function cancelEdit() {
    setEditing(emptyProduct);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    const p = editing;
    if (!p.name.trim()) { alert('Nombre requerido'); return; }
    if (p.price < 0) { alert('Precio inválido'); return; }
  await setDoc(doc(db, 'products', p.id), { ...p, createdAt: p.createdAt ?? serverTimestamp() }, { merge: true });
    setItems(list => {
      const idx = list.findIndex(x => x.id === p.id);
      if (idx >= 0) { const copy = [...list]; copy[idx] = p; return copy; }
      return [p, ...list];
    });
    cancelEdit();
  }

  async function uploadImage(file: File) {
    setUploadError(null);
    if (!file) return;
    let p = editing;
    if (!p.id) {
      // Genera ID automáticamente al subir la primera imagen
      const newId = crypto.randomUUID();
      p = { ...p, id: newId };
      setEditing(p);
      // Crea doc placeholder para asegurar permisos/merge posteriores
      try { await setDoc(doc(db, 'products', newId), { id: newId, createdAt: serverTimestamp() }, { merge: true }); } catch {}
    }
    if (!file.type.startsWith('image/')) { 
      setUploadError('El archivo debe ser una imagen (JPG, PNG, WEBP)'); 
      return; 
    }
    // Límite 5MB en cliente
    if (file.size > 5 * 1024 * 1024) { 
      setUploadError(`La imagen es demasiado grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Máximo permitido: 5MB`); 
      return; 
    }

    try {
      setUploading(true);
      setUploadProgress(0);
      const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
      const path = `products/${p.id}/${Date.now()}_${safeName}`;
      const storageRef = ref(storage, path);
      const task = uploadBytesResumable(storageRef, file, { contentType: file.type });
      await new Promise<void>((resolve, reject) => {
        task.on('state_changed', (snap) => {
          const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          setUploadProgress(pct);
        }, (err) => {
          setUploadError(err?.message || 'Error subiendo la imagen');
          reject(err);
        }, async () => {
          resolve();
        });
      });
      const url = await getDownloadURL(task.snapshot.ref);
      const newP = { ...p, imageUrl: url };
      setEditing(newP);
      // Asegurar que el doc exista y guardar imageUrl (merge)
      await setDoc(doc(db, 'products', p.id), { imageUrl: url }, { merge: true });
      setItems(list => list.map(x => x.id === p.id ? { ...x, imageUrl: url } : x));
    } catch (e: any) {
      setUploadError(e?.message || 'No se pudo subir la imagen');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  async function uploadAudio(file: File) {
    setAudioUploadError(null);
    if (!file) return;
    
    let p = editing;
    if (!p.id) {
      // Genera ID automáticamente al subir el primer archivo
      const newId = crypto.randomUUID();
      p = { ...p, id: newId };
      setEditing(p);
      // Crea doc placeholder para asegurar permisos/merge posteriores
      try { await setDoc(doc(db, 'products', newId), { id: newId, createdAt: serverTimestamp() }, { merge: true }); } catch {}
    }
    
    // Validación de tipo de archivo
    if (!file.type.startsWith('audio/') && !file.name.toLowerCase().endsWith('.mp3')) { 
      setAudioUploadError('El archivo debe ser de audio (MP3)'); 
      return; 
    }
    
    // Límite 50MB para audio
    if (file.size > 50 * 1024 * 1024) { 
      setAudioUploadError(`El archivo de audio es demasiado grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Máximo permitido: 50MB`); 
      return; 
    }

    try {
      setUploadingAudio(true);
      setAudioUploadProgress(0);
      const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
      const path = `products/${p.id}/preview_${Date.now()}_${safeName}`;
      const storageRef = ref(storage, path);
      const task = uploadBytesResumable(storageRef, file, { contentType: file.type || 'audio/mpeg' });
      await new Promise<void>((resolve, reject) => {
        task.on('state_changed', (snap) => {
          const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          setAudioUploadProgress(pct);
        }, (err) => {
          setAudioUploadError(err?.message || 'Error subiendo el audio');
          reject(err);
        }, async () => {
          resolve();
        });
      });
      const url = await getDownloadURL(task.snapshot.ref);
      const newP = { ...p, previewUrl: url };
      setEditing(newP);
      // Asegurar que el doc exista y guardar previewUrl (merge)
      await setDoc(doc(db, 'products', p.id), { previewUrl: url }, { merge: true });
      setItems(list => list.map(x => x.id === p.id ? { ...x, previewUrl: url } : x));
    } catch (e: any) {
      setAudioUploadError(e?.message || 'No se pudo subir el archivo de audio');
    } finally {
      setUploadingAudio(false);
      setAudioUploadProgress(0);
    }
  }

  // Drag & drop handlers
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadImage(file);
  }
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  async function removeProduct(id: string) {
    if (!confirm('¿Eliminar este producto?')) return;
    await deleteDoc(doc(db, 'products', id));
    setItems(list => list.filter(x => x.id !== id));
    if (editing.id === id) cancelEdit();
  }

  const canEdit = useMemo(() => isAdmin, [isAdmin]);

  if (!isAdmin) return <div className="text-gray-300 p-6">Sin acceso.</div>;
  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <h1 className="text-gray-100 text-3xl font-bold mb-6">Productos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-100 text-xl font-semibold">Listado</h2>
            <button onClick={startCreate} className="px-3 py-1.5 bg-lime-400 text-gray-950 rounded-md font-semibold hover:bg-lime-500">Nuevo producto</button>
          </div>
          {loading ? (
            <div className="text-gray-300">Cargando…</div>
          ) : (
            <ul className="divide-y divide-white/10">
              {items.map(p => (
                <li key={p.id} className="py-3 flex items-center gap-4">
                  <img src={p.imageUrl || '/vite.svg'} alt="thumb" className="w-14 h-14 rounded object-cover border border-white/10" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-gray-100 font-medium">{p.name}</div>
                      <span className={`text-xs px-2 py-0.5 rounded ${p.type === 'digital' ? 'bg-purple-400/20 text-purple-300' : 'bg-blue-400/20 text-blue-300'}`}>
                        {p.type === 'digital' ? '🎵 Digital' : '📦 Físico'}
                      </span>
                      {p.previewUrl && <span className="text-xs text-green-400">🎧 Preview</span>}
                    </div>
                    <div className="text-gray-400 text-sm">{p.description}</div>
                  </div>
                  <div className="text-lime-300 font-semibold">
                    {p.price === 0 ? 'GRATIS' : `${(p.price/100).toFixed(2)} €`}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${p.active ? 'bg-lime-400/20 text-lime-300' : 'bg-gray-700 text-gray-300'}`}>{p.active ? 'Activo' : 'Inactivo'}</span>
                    <button onClick={() => startEdit(p)} className="px-2 py-1 bg-gray-800 text-gray-100 rounded border border-white/10 hover:bg-gray-700">Editar</button>
                    <button onClick={() => removeProduct(p.id)} className="px-2 py-1 bg-red-500/90 text-white rounded hover:bg-red-500">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gray-900 border border-white/10 rounded-xl p-4 h-fit">
          <h2 className="text-gray-100 text-xl font-semibold mb-3">{editing.id ? 'Editar' : 'Nuevo'} producto</h2>
          {!canEdit ? <div className="text-gray-300">Sin permisos</div> : (
            <form onSubmit={saveProduct} className="space-y-3">
              <input className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" placeholder="Nombre" value={editing.name} onChange={e=>setEditing(p=>({ ...p, name: e.target.value }))} required />
              <textarea className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" placeholder="Descripción" value={editing.description} onChange={e=>setEditing(p=>({ ...p, description: e.target.value }))} rows={4} />
              
              {/* Tipo de producto */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Tipo de producto</label>
                <select 
                  className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" 
                  value={editing.type} 
                  onChange={e=>setEditing(p=>({ ...p, type: e.target.value as 'digital' | 'physical' }))}
                >
                  <option value="digital">Digital (Música/Samples)</option>
                  <option value="physical">Físico</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" type="number" min={0} step={1} placeholder="Precio (céntimos)" value={editing.price} onChange={e=>setEditing(p=>({ ...p, price: Number(e.target.value) }))} required />
                <label className="flex items-center gap-2 text-gray-200 text-sm">
                  <input type="checkbox" checked={editing.active} onChange={e=>setEditing(p=>({ ...p, active: e.target.checked }))} /> Activo
                </label>
              </div>
              
              {/* Enlace de descarga para productos digitales */}
              {editing.type === 'digital' && (
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm">Enlace de descarga</label>
                  <input 
                    className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" 
                    placeholder="https://enlace-descarga.com/archivo.zip" 
                    value={editing.downloadUrl || ''} 
                    onChange={e=>setEditing(p=>({ ...p, downloadUrl: e.target.value }))}
                  />
                  <div className="text-gray-400 text-xs">
                    Este enlace se enviará por email tras la compra
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="text-gray-300 text-sm">Imagen del producto</div>
                <div
                  ref={dropRef}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  className="border-2 border-dashed border-white/20 rounded-lg p-4 bg-gray-800 hover:border-lime-300 transition-colors"
                >
                  {editing.imageUrl ? (
                    <div className="flex items-center gap-4">
                      <img src={editing.imageUrl} alt="preview" className="w-24 h-24 rounded object-cover border border-white/10" />
                      <div className="flex-1">
                        <div className="text-gray-200 text-sm">Imagen cargada correctamente</div>
                        <div className="text-gray-400 text-xs">Arrastra otra imagen aquí o usa el botón para cambiarla</div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-2 px-2 py-1 bg-gray-700 text-gray-100 rounded text-xs hover:bg-gray-600"
                        >
                          Cambiar imagen
                        </button>
                        {uploading && (
                          <div className="mt-2 w-full bg-gray-700 rounded h-2 overflow-hidden">
                            <div className="bg-lime-400 h-2 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-300 text-sm">
                      {uploading ? (
                        <div className="space-y-3">
                          <div className="text-lime-300">Subiendo imagen... {uploadProgress}%</div>
                          <div className="w-full bg-gray-700 rounded h-2 overflow-hidden">
                            <div className="bg-lime-400 h-2 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mb-2">📸 Arrastra y suelta una imagen aquí</div>
                          <div className="text-gray-400 text-xs mb-3">Formatos soportados: JPG, PNG, WEBP (máx. 5MB)</div>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-lime-400 text-gray-950 rounded font-semibold hover:bg-lime-500 transition-colors"
                          >
                            Seleccionar imagen
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e=>{ const f=e.target.files?.[0]; if (f) uploadImage(f); }}
                  />
                </div>
                {uploadError && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
                    <div className="flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{uploadError}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Archivo de preview para productos digitales */}
              {editing.type === 'digital' && (
                <div className="space-y-2">
                  <div className="text-gray-300 text-sm">Preview de audio (MP3)</div>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 bg-gray-800 hover:border-purple-300 transition-colors">
                    {editing.previewUrl ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-600 rounded flex items-center justify-center">
                            🎵
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-200 text-sm">Preview cargado correctamente</div>
                            <div className="text-gray-400 text-xs">Los usuarios podrán escuchar esta preview</div>
                            <button
                              type="button"
                              onClick={() => audioInputRef.current?.click()}
                              className="mt-2 px-2 py-1 bg-gray-700 text-gray-100 rounded text-xs hover:bg-gray-600"
                            >
                              Cambiar audio
                            </button>
                          </div>
                        </div>
                        <audio controls className="w-full">
                          <source src={editing.previewUrl} type="audio/mpeg" />
                          Tu navegador no soporta el elemento de audio.
                        </audio>
                        {uploadingAudio && (
                          <div className="w-full bg-gray-700 rounded h-2 overflow-hidden">
                            <div className="bg-purple-400 h-2 transition-all duration-300" style={{ width: `${audioUploadProgress}%` }} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-300 text-sm">
                        {uploadingAudio ? (
                          <div className="space-y-3">
                            <div className="text-purple-300">Subiendo audio... {audioUploadProgress}%</div>
                            <div className="w-full bg-gray-700 rounded h-2 overflow-hidden">
                              <div className="bg-purple-400 h-2 transition-all duration-300" style={{ width: `${audioUploadProgress}%` }} />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="mb-2">🎵 Arrastra y suelta un archivo MP3 aquí</div>
                            <div className="text-gray-400 text-xs mb-3">Formato soportado: MP3 (máx. 50MB)</div>
                            <button
                              type="button"
                              onClick={() => audioInputRef.current?.click()}
                              className="px-4 py-2 bg-purple-600 text-white rounded font-semibold hover:bg-purple-500 transition-colors"
                            >
                              Seleccionar audio
                            </button>
                          </>
                        )}
                      </div>
                    )}
                    <input
                      ref={audioInputRef}
                      type="file"
                      accept="audio/*,.mp3"
                      className="hidden"
                      onChange={e=>{ const f=e.target.files?.[0]; if (f) uploadAudio(f); }}
                    />
                  </div>
                  {audioUploadError && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
                      <div className="flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{audioUploadError}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-lime-400 text-gray-950 rounded-md font-semibold hover:bg-lime-500" type="submit">Guardar</button>
                <button className="px-3 py-1.5 bg-gray-800 text-gray-100 rounded-md border border-white/10 hover:bg-gray-700" type="button" onClick={cancelEdit}>Cancelar</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
