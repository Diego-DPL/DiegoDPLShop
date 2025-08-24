# 🚨 Error 403 en Upload de Audio - Solución

## Problema
Error al subir archivos MP3: `POST ... 403 (Forbidden)`

## ✅ Solución Rápida

### Opción 1: Reglas Simplificadas (Recomendada para desarrollo)

1. Ve a **Firebase Console** → **Storage** → **Rules**
2. Reemplaza las reglas actuales con el contenido de `storage-simple.rules`
3. **Publica las reglas**

### Opción 2: Reglas Temporales Muy Permisivas

1. Ve a **Firebase Console** → **Storage** → **Rules**
2. Usa estas reglas temporales:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## 📋 Pasos Detallados

### 1. Ir a Firebase Console
- [console.firebase.google.com](https://console.firebase.google.com)
- Selecciona tu proyecto: **diego-dpl-shop**

### 2. Navegar a Storage Rules
- Menú lateral → **Storage**
- Pestaña **Rules**

### 3. Reemplazar Reglas
- Copia el contenido de `storage-simple.rules`
- Pega en el editor
- Haz clic en **"Publish"**

### 4. Verificar Funcionamiento
- Ve a `/admin` en tu app
- Intenta subir un archivo MP3
- Debería funcionar sin errores 403

## 🔧 Diagnóstico

Si sigue fallando, verifica:

1. **Usuario admin**: ¿Tienes `role: 'admin'` en Firestore?
2. **Autenticación**: ¿Estás logueado correctamente?
3. **Reglas publicadas**: ¿Se guardaron los cambios en Firebase?

## 📁 Archivos de Reglas Disponibles

- `storage.rules` - Reglas originales complejas
- `storage-simple.rules` - Reglas simplificadas que funcionan
- `storage-dev.rules` - Reglas muy permisivas para desarrollo

## ⚡ Solución Inmediata

Si necesitas una solución YA, usa estas reglas súper permisivas:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**⚠️ Solo para desarrollo - NO uses en producción**
