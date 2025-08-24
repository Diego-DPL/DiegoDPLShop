import { storage, auth, db } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Utilidad de diagnóstico para verificar la configuración de Firebase
 * Usar solo en desarrollo para detectar problemas
 */
export async function diagnoseFirebaseSetup() {
  console.log('🔍 Diagnóstico de Firebase...');
  
  // 1. Verificar autenticación
  const user = auth.currentUser;
  if (!user) {
    console.error('❌ Usuario no autenticado');
    return false;
  }
  console.log('✅ Usuario autenticado:', user.email);
  
  // 2. Verificar perfil y rol de admin
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      console.error('❌ Perfil de usuario no encontrado en Firestore');
      return false;
    }
    
    const userData = userDoc.data();
    console.log('✅ Perfil encontrado:', userData);
    
    if (userData.role !== 'admin') {
      console.error('❌ Usuario no es administrador');
      return false;
    }
    console.log('✅ Usuario es administrador');
  } catch (error) {
    console.error('❌ Error accediendo a Firestore:', error);
    return false;
  }
  
  // 3. Verificar configuración de Storage
  try {
    const storageRef = ref(storage, 'test/diagnostic.txt');
    console.log('📂 Bucket de Storage:', storage.app.options.storageBucket);
    console.log('🔗 Referencia de prueba:', storageRef.fullPath);
  } catch (error) {
    console.error('❌ Error configurando Storage:', error);
    return false;
  }
  
  console.log('✅ Diagnóstico completado');
  return true;
}

/**
 * Función para probar upload a Storage
 */
export async function testStorageUpload() {
  try {
    // Crear un archivo de prueba muy pequeño
    const testFile = new Blob(['test'], { type: 'text/plain' });
    const testRef = ref(storage, `test/diagnostic-${Date.now()}.txt`);
    
    console.log('🧪 Probando upload a:', testRef.fullPath);
    await uploadBytes(testRef, testFile);
    
    const url = await getDownloadURL(testRef);
    console.log('✅ Upload exitoso, URL:', url);
    return true;
  } catch (error) {
    console.error('❌ Error en upload de prueba:', error);
    return false;
  }
}
