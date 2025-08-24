import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { createUserProfile } from '../utils/user';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const VerifyEmail: React.FC = () => {
  const { user, resendVerification } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);
  const [verified, setVerified] = useState<boolean>(!!user?.emailVerified);
  const [redirectIn, setRedirectIn] = useState(3);

  const emailDomain = useMemo(() => {
    const email = user?.email ?? '';
    const domain = email.split('@')[1] || '';
    return domain.toLowerCase();
  }, [user?.email]);

  // Auto comprobación periódica cada 4s
  useEffect(() => {
    if (verified) return;
    const id = setInterval(async () => {
      try {
        if (auth.currentUser) {
          await auth.currentUser.reload();
          if (auth.currentUser.emailVerified) {
            setVerified(true);
            // Intentar crear el perfil si no existe
            await ensureUserProfile();
          }
        }
      } catch {}
    }, 4000);
    return () => clearInterval(id);
  }, [verified]);

  // Función para asegurar que el perfil de usuario existe
  async function ensureUserProfile() {
    if (!auth.currentUser) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (!userDoc.exists()) {
        // El perfil no existe, intentar crearlo con datos básicos
        await createUserProfile({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email || '',
          displayName: auth.currentUser.displayName || 'Usuario',
          role: 'user',
        });
        console.log('✅ Perfil de usuario creado después de verificación de email');
      }
    } catch (error) {
      console.error('❌ Error al verificar/crear perfil de usuario:', error);
    }
  }

  // Redirección con cuenta atrás cuando queda verificado
  useEffect(() => {
    if (!verified) return;
    const id = setInterval(() => setRedirectIn((s) => Math.max(0, s - 1)), 1000);
    if (redirectIn === 0) {
      navigate('/', { replace: true });
    }
    return () => clearInterval(id);
  }, [verified, redirectIn, navigate]);

  async function checkNow() {
    if (!auth.currentUser) return;
    setChecking(true);
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        setVerified(true);
        // Intentar crear el perfil si no existe
        await ensureUserProfile();
      }
    } finally {
      setChecking(false);
    }
  }

  const providerQuickLink = useMemo(() => {
    if (!emailDomain) return 'https://mail.google.com/';
    if (emailDomain.includes('gmail')) return 'https://mail.google.com/';
    if (emailDomain.includes('outlook') || emailDomain.includes('hotmail') || emailDomain.includes('live')) return 'https://outlook.live.com/mail/0/';
    if (emailDomain.includes('yahoo')) return 'https://mail.yahoo.com/';
    return 'https://'+emailDomain;
  }, [emailDomain]);

  return (
    <div className="bg-gray-950 min-h-[70vh] py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-2xl mx-auto bg-gray-900 border border-white/10 rounded-xl p-8">
        {verified ? (
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-lime-400/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-lime-400"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.94a.75.75 0 1 0-1.22-.88l-3.236 4.487-1.56-1.56a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.69-5.264Z" clipRule="evenodd"/></svg>
            </div>
            <h1 className="text-gray-100 text-2xl md:text-3xl font-bold">¡Email verificado!</h1>
            <p className="text-gray-300/90 mt-2">Te redirigimos al inicio en {redirectIn}…</p>
            <button onClick={() => navigate('/')} className="mt-6 px-5 py-2 bg-lime-400 text-gray-950 rounded-md font-semibold hover:bg-lime-500">Ir ahora</button>
          </div>
        ) : (
          <div>
            <h1 className="text-gray-100 text-2xl md:text-3xl font-bold">Verifica tu correo</h1>
            <p className="text-gray-300/90 mt-2">Hemos enviado un email a <span className="font-semibold">{user?.email}</span>. Abre el enlace para activar tu cuenta.</p>

            <ol className="mt-6 space-y-3 text-gray-300/90">
              <li>1. Revisa la bandeja de entrada y SPAM.</li>
              <li>2. Abre el correo de verificación y pulsa el botón.</li>
              <li>3. Vuelve aquí: te reconoceremos automáticamente.</li>
            </ol>

            <div className="mt-6 flex flex-wrap gap-3">
              <a className="px-5 py-2 bg-gray-800 text-gray-100 rounded-md border border-white/10 hover:bg-gray-700" href={providerQuickLink} target="_blank" rel="noreferrer">Abrir mi correo</a>
              <button onClick={resendVerification} className="px-5 py-2 bg-gray-800 text-gray-100 rounded-md border border-white/10 hover:bg-gray-700">Reenviar email</button>
              <button onClick={checkNow} disabled={checking} className="px-5 py-2 bg-lime-400 text-gray-950 rounded-md font-semibold hover:bg-lime-500 disabled:opacity-60">Ya verifiqué</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
