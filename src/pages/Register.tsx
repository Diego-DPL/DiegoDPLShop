import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { createUserProfile } from '../utils/user';
import { updateProfile } from 'firebase/auth';
import { getAllCountries, getStatesOf, getCitiesOf } from '../utils/geo';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== password2) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      const user = await register(email, password);
      try { await updateProfile(user, { displayName }); } catch {}
      // Intentar guardar el perfil; si las reglas lo impiden, continuamos igualmente
      try {
        await createUserProfile({
          uid: user.uid,
          email,
          displayName,
          firstName,
          lastName,
          phone,
          address: { line1, line2, city, state, postal_code: postalCode, country },
          role: 'user',
        });
      } catch (_e) {
        // Permisos insuficientes o Firestore no accesible: lo podremos crear después
      }
      setNotice('Cuenta creada. Revisa tu correo y verifica tu email para poder iniciar sesión.');
      navigate('/verify-email', { replace: true });
    } catch (err: any) {
      setError(err.message ?? 'No se pudo crear la cuenta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <h1 className="text-gray-300 text-4xl md:text-6xl font-bold font-plus-jakarta mb-8">Crear cuenta</h1>
      <form onSubmit={onSubmit} className="max-w-2xl bg-gray-900 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
        {error && <div className="text-red-400 text-sm">{error}</div>}
        {notice && <div className="text-lime-300 text-sm">{notice}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" type="text" placeholder="Nombre artístico" value={displayName} onChange={e=>setDisplayName(e.target.value)} required />
          <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" type="text" placeholder="Nombre" value={firstName} onChange={e=>setFirstName(e.target.value)} />
          <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" type="text" placeholder="Apellidos" value={lastName} onChange={e=>setLastName(e.target.value)} />
          <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" type="tel" placeholder="Teléfono (opcional)" value={phone} onChange={e=>setPhone(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" type="password" placeholder="Contraseña (mín. 6 chars)" value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required />
          <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" type="password" placeholder="Repite la contraseña" value={password2} onChange={e=>setPassword2(e.target.value)} minLength={6} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" placeholder="Dirección (línea 1)" value={line1} onChange={e=>setLine1(e.target.value)} />
          <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" placeholder="Dirección (línea 2)" value={line2} onChange={e=>setLine2(e.target.value)} />

          {/* País */}
          <select className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" value={country} onChange={e=>{ setCountry(e.target.value); setState(''); setCity(''); }} required>
            <option value="">Selecciona país</option>
            {getAllCountries().map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>

          {/* Provincia/Estado */}
          <select className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" value={state} onChange={e=>{ setState(e.target.value); setCity(''); }} disabled={!country} required>
            <option value="">Selecciona provincia/estado</option>
            {getStatesOf(country).map(s => (
              <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
            ))}
          </select>

          {/* Ciudad */}
          <select className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" value={city} onChange={e=>setCity(e.target.value)} disabled={!state} required>
            <option value="">Selecciona ciudad</option>
            {getCitiesOf(country, state).map(ci => (
              <option key={ci.name} value={ci.name}>{ci.name}</option>
            ))}
          </select>

          <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" placeholder="Código Postal" value={postalCode} onChange={e=>setPostalCode(e.target.value)} />
        </div>

        <button disabled={loading} className="px-4 py-2 bg-lime-400 text-gray-950 rounded-md font-semibold hover:bg-lime-500 disabled:opacity-60">Crear cuenta</button>
        <p className="text-gray-300/80 text-sm">¿Ya tienes cuenta? <Link to="/login" className="text-lime-300">Inicia sesión</Link></p>
      </form>
    </div>
  );
};

export default Register;
