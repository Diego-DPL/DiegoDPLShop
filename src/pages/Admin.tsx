import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

type UserRow = { id: string; email: string; displayName?: string; role?: 'user'|'admin' };

const Admin: React.FC = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(query(collection(db, 'users')));
        const rows: UserRow[] = snap.docs.map(d => ({ id: d.id, email: d.data().email, displayName: d.data().displayName, role: d.data().role }));
        setUsers(rows);
      } finally { setLoading(false); }
    }
    if (isAdmin) load();
  }, [isAdmin]);

  async function setRole(id: string, role: 'user'|'admin') {
    await updateDoc(doc(db, 'users', id), { role });
    setUsers(u => u.map(x => x.id === id ? { ...x, role } : x));
  }

  // Productos placeholder: se crean en 'products/{id}'
  async function createProduct() {
    const id = crypto.randomUUID();
    await setDoc(doc(db, 'products', id), { id, name: 'Nuevo producto', price: 0, active: false, createdAt: Date.now() });
    alert('Producto creado: '+id);
  }

  if (!isAdmin) {
    return (
      <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
        <div className="text-gray-300 p-6">
          <h1 className="text-gray-100 text-2xl font-bold mb-4">Sin acceso</h1>
          <p className="mb-4">No tienes permisos de administrador.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <h1 className="text-gray-100 text-3xl font-bold mb-6">Panel de administración</h1>

      <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-gray-100 text-xl font-semibold">Usuarios</h2>
        </div>
        {loading ? <div className="text-gray-300">Cargando…</div> : (
          <div className="space-y-2">
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between border border-white/10 rounded px-3 py-2">
                <div className="text-gray-200">
                  <div className="font-medium">{u.displayName || '—'}</div>
                  <div className="text-gray-400 text-sm">{u.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Rol:</span>
                  <select className="bg-gray-800 text-gray-100 rounded px-2 py-1 border border-white/10" value={u.role || 'user'} onChange={e=>setRole(u.id, e.target.value as any)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-gray-100 text-xl font-semibold">Productos</h2>
          <a href="/admin/products" className="px-3 py-1.5 bg-gray-800 text-gray-100 rounded-md border border-white/10 hover:bg-gray-700">Gestionar</a>
          <button onClick={createProduct} className="px-3 py-1.5 bg-lime-400 text-gray-950 rounded-md font-semibold hover:bg-lime-500">Crear rápido</button>
        </div>
  <p className="text-gray-400 text-sm">Gestiona el catálogo desde <a className="text-lime-300 underline" href="/admin/products">Productos</a>.</p>
      </div>

      <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
        <h2 className="text-gray-100 text-xl font-semibold mb-4">Órdenes</h2>
        <p className="text-gray-400 text-sm">(Placeholder) Listado/gestión de órdenes. Añadiremos filtrado y estados cuando integremos checkout real.</p>
      </div>
    </div>
  );
};

export default Admin;
