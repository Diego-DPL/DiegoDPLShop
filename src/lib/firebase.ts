import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// App Check: en desarrollo habilita token debug; en prod usa reCAPTCHA v3 (requiere site key)
/* Desactivado temporalmente para simplificar la subida de archivos
if (typeof window !== 'undefined') {
  try {
    if (import.meta.env.DEV) {
      const dbg = (import.meta as any).env?.VITE_APPCHECK_DEBUG_TOKEN as string | undefined;
      // @ts-expect-error enable debug token
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = dbg || true;
    }
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider((import.meta as any).env?.VITE_RECAPTCHA_V3_SITE_KEY || 'debug'),
      isTokenAutoRefreshEnabled: true,
    });
  } catch {}
}
*/

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
