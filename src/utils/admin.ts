import { collection, addDoc, serverTimestamp, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number; // en céntimos, 0 = gratuito
  active: boolean;
  imageUrl?: string;
  // Nuevos campos para productos digitales
  previewUrl?: string; // URL del MP3 de preview
  downloadUrl?: string; // Enlace de descarga del producto completo
  type: 'digital' | 'physical'; // Tipo de producto
  createdAt?: any;
};

export type Order = {
  id?: string;
  userId: string;
  items: Array<{ productId: string; name: string; price: number; quantity: number }>;
  total: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'fulfilled';
  createdAt?: any;
};

export async function createOrder(order: Omit<Order, 'id'|'createdAt'>) {
  const ref = await addDoc(collection(db, 'orders'), { ...order, createdAt: serverTimestamp() });
  return ref.id;
}

export async function createOrUpdateProduct(p: Product) {
  await setDoc(doc(db, 'products', p.id), { ...p, createdAt: p.createdAt ?? serverTimestamp() }, { merge: true });
}

/**
 * Función para promover un usuario a administrador
 * Esta función debe ser ejecutada por un usuario que ya sea admin,
 * o temporalmente en desarrollo
 */
export async function promoteUserToAdmin(uid: string) {
  try {
    const userRef = doc(db, 'users', uid);
    
    // Verificar que el usuario existe
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('Usuario no encontrado');
    }
    
    // Actualizar el rol a admin
    await updateDoc(userRef, {
      role: 'admin'
    });
    
    return true;
  } catch (error) {
    throw error;
  }
}

/**
 * Función para verificar el rol de un usuario
 */
export async function getUserRole(uid: string): Promise<'user' | 'admin' | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return null;
    }
    
    return userDoc.data().role || 'user';
  } catch (error) {
    return null;
  }
}
