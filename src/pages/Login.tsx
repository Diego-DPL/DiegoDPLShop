import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      // Si no está verificado, mandamos a verificación
      if (!auth.currentUser?.emailVerified) {
        navigate('/verify-email');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message ?? 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <h1 className="text-gray-300 text-4xl md:text-6xl font-bold font-plus-jakarta mb-8">Iniciar sesión</h1>
      <form onSubmit={onSubmit} className="max-w-md bg-gray-900 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-white/10" type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button disabled={loading} className="px-4 py-2 bg-lime-400 text-gray-950 rounded-md font-semibold hover:bg-lime-500 disabled:opacity-60">Entrar</button>
        <p className="text-gray-300/80 text-sm">¿No tienes cuenta? <Link to="/register" className="text-lime-300">Regístrate</Link></p>
      </form>
    </div>
  );
};

export default Login;
