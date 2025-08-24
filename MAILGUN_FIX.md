# 🚨 Solución Error 401 (Unauthorized) - Mailgun

## Problema Detectado
El error `401 (Unauthorized)` indica un problema de autenticación con Mailgun.

## 🔧 Soluciones (en orden de prioridad)

### 1. Usar Dominio Sandbox (Recomendado para pruebas)
Mailgun te proporciona un dominio sandbox automáticamente:

```bash
# En tu archivo .env, cambia:
VITE_MAILGUN_DOMAIN="sandbox-abc123def456.mailgun.org"
VITE_FROM_EMAIL="no-reply@sandbox-abc123def456.mailgun.org"
```

**Cómo encontrar tu dominio sandbox:**
1. Ve a tu dashboard de Mailgun
2. En **Sending** → **Domains**
3. Busca el dominio que empieza con `sandbox-`
4. Cópialo completo

### 2. Verificar API Key
Asegúrate de usar la API Key correcta:

```bash
# Debe empezar con "key-" seguido de 32 caracteres
VITE_MAILGUN_API_KEY="key-1234567890abcdef1234567890abcdef"
```

**Cómo obtener la API Key:**
1. Dashboard de Mailgun → **Settings** → **API Keys**
2. Copia la **Private API Key**

### 3. Si quieres usar dominio propio (diegodpl.com)

Necesitas configurar un subdominio:

```bash
# Opción A: Subdominio específico
VITE_MAILGUN_DOMAIN="mg.diegodpl.com"
VITE_FROM_EMAIL="no-reply@mg.diegodpl.com"

# Opción B: Subdominio mail
VITE_MAILGUN_DOMAIN="mail.diegodpl.com"
VITE_FROM_EMAIL="no-reply@mail.diegodpl.com"
```

**Pasos para configurar dominio propio:**
1. En Mailgun: **Sending** → **Domains** → **Add New Domain**
2. Añade el subdominio (ej: `mg.diegodpl.com`)
3. Sigue las instrucciones para añadir registros DNS
4. Espera a que se verifique (puede tardar hasta 48h)

## 🧪 Configuración Recomendada para Pruebas Inmediatas

Edita tu archivo `.env`:

```bash
# Configuración de Mailgun - USAR DOMINIO SANDBOX
VITE_MAILGUN_API_KEY="tu-api-key-aqui"
VITE_MAILGUN_DOMAIN="sandbox-abc123def456.mailgun.org"
VITE_FROM_EMAIL="noreply@sandbox-abc123def456.mailgun.org"
```

## 📋 Checklist de Verificación

- [ ] API Key empieza con "key-" y tiene 32 caracteres
- [ ] Dominio existe en tu dashboard de Mailgun
- [ ] Si es dominio propio, está verificado (status: Active)
- [ ] Email FROM coincide con el dominio configurado
- [ ] No hay espacios extra en las variables de entorno

## 🔄 Después de Cambiar la Configuración

1. Guarda el archivo `.env`
2. El servidor de Vite se reiniciará automáticamente
3. Prueba de nuevo el envío de email
4. Revisa la consola para confirmar que funciona

## 📧 Limitaciones del Dominio Sandbox

- Solo puedes enviar emails a direcciones **autorizadas**
- Máximo 300 emails/día
- Perfecto para desarrollo y testing

**Para autorizar tu email en sandbox:**
1. Mailgun Dashboard → **Sending** → **Authorized Recipients**
2. Añade tu email personal para recibir los tests

¡Con estas configuraciones deberías poder enviar emails inmediatamente!
