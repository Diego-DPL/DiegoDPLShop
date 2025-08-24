# 📧 Configuración del Sistema de Email con Mailgun

Este documento explica cómo configurar Mailgun para el envío automático de emails con enlaces de descarga.

## 🔧 Configuración de Mailgun

### 1. Crear cuenta en Mailgun
1. Ve a [mailgun.com](https://www.mailgun.com/)
2. Crea una cuenta gratuita (incluye 5,000 emails/mes)
3. Verifica tu cuenta

### 2. Obtener credenciales
1. Ve al **Dashboard** de Mailgun
2. En **Sending** → **Domains** crea o selecciona tu dominio
3. Anota:
   - **API Key**: En **Settings** → **API Keys**
   - **Domain**: Tu dominio verificado (ej: `mg.tudominio.com`)

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Configuración de Mailgun
VITE_MAILGUN_API_KEY=key-1234567890abcdef1234567890abcdef
VITE_MAILGUN_DOMAIN=mg.tudominio.com
VITE_FROM_EMAIL=noreply@tudominio.com
```

⚠️ **Importante**: Nunca commitees este archivo. Está en `.gitignore`.

## 🎯 Funcionalidades del Sistema de Email

### Envío Automático
- **Productos gratuitos**: Email inmediato tras confirmar
- **Productos de pago**: Email tras confirmación de pago de Stripe
- **Reintentos**: El sistema maneja errores automáticamente

### Contenido del Email
- **HTML responsivo** con diseño del brand
- **Enlaces de descarga** directos y seguros
- **Información del pedido** con número único
- **Instrucciones claras** para el usuario
- **Texto plano** como fallback

### Seguridad
- Enlaces de descarga con **expiración de 30 días**
- **Límite de descargas** por enlace (3 veces)
- **Validación de usuario** autenticado

## 🧪 Modo de Desarrollo

Si no configuras las variables de entorno, el sistema funciona en **modo simulación**:
- Los emails se muestran en la consola del navegador
- No se envían emails reales
- Útil para desarrollo y testing

## 📋 Verificación de Configuración

### Probar el sistema:
1. Añade productos al carrito
2. Ve a checkout (requiere login)
3. Confirma la compra
4. Verifica que aparece "Email enviado"
5. Revisa la bandeja de entrada

### Logs útiles:
```javascript
// En la consola del navegador verás:
"Email enviado exitosamente: {response}"
// O en caso de error:
"Error enviando email: {error}"
```

## 🎨 Personalización del Email

El template está en `src/utils/email.ts`:

### Cambiar colores:
```css
background: linear-gradient(135deg, #84cc16, #a3e635); /* Verde DiegoDPL */
```

### Modificar contenido:
- Edita `createDownloadEmailHTML()` para el HTML
- Edita `createDownloadEmailText()` para texto plano

### Añadir elementos:
- Logo personalizado
- Enlaces adicionales
- Información de contacto
- Políticas de uso

## 🔍 Solución de Problemas

### Email no se envía:
1. Verifica las variables de entorno
2. Confirma que el dominio está verificado en Mailgun
3. Revisa los logs de la consola
4. Verifica que el API key tiene permisos

### Email va a spam:
1. Configura SPF, DKIM y DMARC en tu dominio
2. Usa un dominio verificado y con buena reputación
3. Evita palabras spam en el asunto y contenido

### Enlaces no funcionan:
1. Verifica que `downloadUrl` existe en el producto
2. Confirma que Firebase Storage permite lectura pública
3. Revisa las reglas de Storage

## 📈 Métricas y Monitoreo

Mailgun proporciona:
- **Delivery rate** (tasa de entrega)
- **Open rate** (emails abiertos)
- **Click rate** (enlaces clickeados)
- **Bounce rate** (emails rebotados)

Accede a estas métricas en el dashboard de Mailgun.

## 🚀 Próximos Pasos

1. **Integrar Stripe** para pagos reales
2. **Añadir plantillas** para diferentes tipos de email
3. **Sistema de notificaciones** para admins
4. **Analytics** de conversión por email
5. **Sistema de seguimiento** de descargas
