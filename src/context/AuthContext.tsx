import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export type Profile = {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  profile: Profile | null;
  isAdmin: boolean;
  profileLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  resendVerification: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      // Activar carga de perfil al detectar usuario
      if (u) {
        setProfileLoading(true);
      } else {
        setProfileLoading(false);
        setProfile(null);
      }
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Cargar perfil cuando hay usuario
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user) { setProfile(null); setProfileLoading(false); return; }
      setProfileLoading(true);
      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (!cancelled) {
          setProfile((snap.data() as Profile) ?? null);
          setProfileLoading(false);
        }
      } catch {
        if (!cancelled) { setProfile(null); setProfileLoading(false); }
      }
    }
    load();
    return () => { cancelled = true; };
  }, [user]);

  const value = useMemo<AuthContextType>(() => ({
    user,
    loading,
    profile,
    isAdmin: !!profile && profile.role === 'admin',
  profileLoading,
    async login(email, password) {
      await signInWithEmailAndPassword(auth, email, password);
    },
    async register(email, password) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      try { await sendEmailVerification(cred.user); } catch {}
      return cred.user as User;
    },
    async logout() {
      await signOut(auth);
    },
    async resendVerification() {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      }
    },
  }), [user, loading, profile, profileLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
