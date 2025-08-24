import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Account: React.FC = () => {
  const { user, profile } = useAuth();
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (!user) return <div className="text-gray-300 p-6">Necesitas iniciar sesión.</div>;

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      if (!user) return; // guarda de seguridad
      await setDoc(doc(db, 'users', user.uid!), { displayName, phone }, { merge: true });
      setMsg('Perfil actualizado');
    } catch (e: any) {
      setMsg(e.message || 'No se pudo guardar');
    } finally { setSaving(false); }
  }

  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <h1 className="text-gray-100 text-3xl font-bold mb-6">Mi cuenta</h1>
      <div className="max-w-xl bg-gray-900 border border-white/10 rounded-xl p-6">
        {msg && <div className="text-sm text-gray-300 mb-3">{msg}</div>}
        <div className="space-y-3">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <div className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10">{user.email}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Nombre artístico</label>
            <input className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Teléfono</label>
            <input className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" value={phone} onChange={e=>setPhone(e.target.value)} />
          </div>
          <button disabled={saving} onClick={save} className="px-4 py-2 bg-lime-400 text-gray-950 rounded-md font-semibold hover:bg-lime-500 disabled:opacity-60">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
