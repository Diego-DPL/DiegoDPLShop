# 🔑 Configuración de API Keys de Mailgun

## Problema Común
Error 401 (Unauthorized) al enviar emails a través de Mailgun.

## Causa Identificada
Es necesario usar la **API Key privada de la cuenta** en lugar de la API Key del dominio.

## Solución

### 1. Obtener la API Key Privada
1. Ve a [Mailgun Dashboard](https://app.mailgun.com/mg/dashboard)
2. En el menú lateral izquierdo, haz clic en **"API Keys"**
3. Busca la **"Private API key"** (NO la "Domain API key")
4. Copia esa clave completa

### 2. Tipos de API Keys

#### ❌ Domain API Key (ejemplo)
```
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx-xxxxxxxx
```
- Específica del dominio
- Puede tener permisos limitados
- Causa errores 401/403

#### ✅ Private API Key (la que necesitas)
```
key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- Empieza con `key-`
- Acceso completo a la cuenta
- Funciona con todos los dominios

### 3. Actualizar Configuración
En el archivo `.env`, actualiza:

```env
# API Key privada de la cuenta (NECESARIA)
VITE_MAILGUN_PRIVATE_KEY="key-tu-clave-privada-aqui"
```

### 4. Configuración de Endpoints
El código ahora intenta:
1. **Endpoint EU** con API Key del dominio
2. **Endpoint EU** con API Key privada
3. **Endpoint US** con API Key privada

### 5. URLs de Endpoints
- **Europa**: `https://api.eu.mailgun.net`
- **Estados Unidos**: `https://api.mailgun.net`

## Estado Requerido
- ✅ Dominio verificado en Mailgun
- ✅ DNS configurado correctamente
- ✅ Email FROM configurado correctamente
- ✅ API Key privada configurada

## Próximos Pasos
1. Obtener API Key privada de Mailgun
2. Actualizar archivo `.env` local
3. Verificar configuración
4. Probar envío de email
