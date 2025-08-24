import formData from 'form-data';
import Mailgun from 'mailgun.js';
import type { CartItem } from '../context/CartContext';

// Configuración de Mailgun (estas variables deberían estar en variables de entorno)
const MAILGUN_API_KEY = import.meta.env.VITE_MAILGUN_API_KEY || 'tu-api-key-aqui';
const MAILGUN_PRIVATE_KEY = import.meta.env.VITE_MAILGUN_PRIVATE_KEY || MAILGUN_API_KEY;
const MAILGUN_DOMAIN = import.meta.env.VITE_MAILGUN_DOMAIN || 'tu-dominio-aqui';
const FROM_EMAIL = import.meta.env.VITE_FROM_EMAIL || 'noreply@diegodpl.com';

// Inicializar Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: MAILGUN_API_KEY,
  url: 'https://api.eu.mailgun.net' // Usar endpoint europeo
});

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    // Verificar que las variables estén configuradas
    if (!MAILGUN_API_KEY || MAILGUN_API_KEY === 'tu-api-key-aqui' || !MAILGUN_DOMAIN || MAILGUN_DOMAIN === 'tu-dominio-aqui') {
      return false;
    }

    // Primer intento con la configuración actual
    try {
      await mg.messages.create(MAILGUN_DOMAIN, {
        from: FROM_EMAIL,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text || stripHtml(emailData.html),
      });

      return true;
    } catch (firstError: any) {
      // Segundo intento con API Key privada
      const mgPrivate = mailgun.client({
        username: 'api',
        key: MAILGUN_PRIVATE_KEY,
        url: 'https://api.eu.mailgun.net'
      });

      try {
        await mgPrivate.messages.create(MAILGUN_DOMAIN, {
          from: FROM_EMAIL,
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text || stripHtml(emailData.html),
        });

        return true;
      } catch (secondError: any) {
        // Tercer intento con endpoint estadounidense
        const mgUS = mailgun.client({
          username: 'api',
          key: MAILGUN_PRIVATE_KEY,
          url: 'https://api.mailgun.net' // Endpoint US
        });

        await mgUS.messages.create(MAILGUN_DOMAIN, {
          from: FROM_EMAIL,
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text || stripHtml(emailData.html),
        });

        return true;
      }
    }

  } catch (error: any) {
    return false;
  }
}

// Función para crear el HTML del email de descarga
export function createDownloadEmailHTML(
  customerName: string,
  items: CartItem[],
  orderNumber: string
): string {
  const digitalItems = items.filter(item => item.type === 'digital');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Enlaces de Descarga - DiegoDPL Shop</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #0f0f0f; color: #ffffff;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 1px solid #333;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #84cc16, #a3e635); padding: 30px; text-align: center;">
          <h1 style="margin: 0; color: #000; font-size: 28px; font-weight: bold;">🎵 DiegoDPL Shop</h1>
          <p style="margin: 10px 0 0 0; color: #333; font-size: 16px;">¡Gracias por tu compra!</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          <h2 style="color: #84cc16; margin: 0 0 20px 0; font-size: 24px;">
            Hola ${customerName}
          </h2>
          
          <p style="color: #cccccc; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
            Tu pedido <strong>#${orderNumber}</strong> ha sido procesado exitosamente. 
            Aquí tienes los enlaces de descarga para tus productos digitales:
          </p>

          <!-- Products List -->
          <div style="background-color: #2a2a2a; border-radius: 8px; padding: 20px; margin: 20px 0;">
            ${digitalItems.map(item => `
              <div style="border-bottom: 1px solid #444; padding: 15px 0; margin-bottom: 15px; last-child: border-bottom: none;">
                <h3 style="color: #84cc16; margin: 0 0 10px 0; font-size: 18px;">
                  🎵 ${item.name}
                </h3>
                <p style="color: #999; margin: 0 0 15px 0; font-size: 14px;">
                  Cantidad: ${item.quantity} | ${item.price === 0 ? 'GRATIS' : `$${(item.price / 100).toFixed(2)}`}
                </p>
                ${item.downloadUrl ? `
                  <a href="${item.downloadUrl}" 
                     style="display: inline-block; background: linear-gradient(135deg, #84cc16, #a3e635); 
                            color: #000; text-decoration: none; padding: 12px 24px; border-radius: 6px; 
                            font-weight: bold; font-size: 14px; margin-top: 10px;">
                    ⬇️ Descargar Ahora
                  </a>
                ` : `
                  <p style="color: #ff6b6b; font-size: 14px; margin: 10px 0;">
                    ⚠️ Enlace de descarga no disponible
                  </p>
                `}
              </div>
            `).join('')}
          </div>

          <!-- Important Notes -->
          <div style="background-color: #1a2332; border-left: 4px solid #84cc16; padding: 20px; margin: 20px 0;">
            <h4 style="color: #84cc16; margin: 0 0 10px 0; font-size: 16px;">📋 Información Importante:</h4>
            <ul style="color: #cccccc; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Los enlaces de descarga estarán disponibles por 30 días</li>
              <li>Puedes descargar cada archivo hasta 3 veces</li>
              <li>Si tienes problemas, contacta nuestro soporte</li>
              <li>Mantén este email para futuras referencias</li>
            </ul>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #888; font-size: 14px; margin: 0 0 10px 0;">
              ¿Necesitas ayuda? Contáctanos en: 
              <a href="mailto:support@diegodpl.com" style="color: #84cc16;">support@diegodpl.com</a>
            </p>
            <p style="color: #666; font-size: 12px; margin: 0;">
              © 2025 DiegoDPL Shop. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Función para crear el texto plano del email
export function createDownloadEmailText(
  customerName: string,
  items: CartItem[],
  orderNumber: string
): string {
  const digitalItems = items.filter(item => item.type === 'digital');
  
  return `
🎵 DiegoDPL Shop - Enlaces de Descarga

Hola ${customerName},

¡Gracias por tu compra! Tu pedido #${orderNumber} ha sido procesado exitosamente.

Productos digitales adquiridos:
${digitalItems.map(item => `
• ${item.name}
  Cantidad: ${item.quantity} | ${item.price === 0 ? 'GRATIS' : `$${(item.price / 100).toFixed(2)}`}
  ${item.downloadUrl ? `Enlace: ${item.downloadUrl}` : 'Enlace no disponible'}
`).join('')}

INFORMACIÓN IMPORTANTE:
- Los enlaces de descarga estarán disponibles por 30 días
- Puedes descargar cada archivo hasta 3 veces
- Si tienes problemas, contacta nuestro soporte
- Mantén este email para futuras referencias

¿Necesitas ayuda? Contáctanos en: support@diegodpl.com

© 2025 DiegoDPL Shop. Todos los derechos reservados.
  `.trim();
}

// Función para enviar email de descarga
export async function sendDownloadEmail(
  customerEmail: string,
  customerName: string,
  items: CartItem[],
  orderNumber: string
): Promise<boolean> {
  const digitalItems = items.filter(item => item.type === 'digital');
  
  if (digitalItems.length === 0) {
    return true;
  }

  const emailData: EmailData = {
    to: customerEmail,
    subject: `🎵 Enlaces de Descarga - Pedido #${orderNumber} - DiegoDPL Shop`,
    html: createDownloadEmailHTML(customerName, items, orderNumber),
    text: createDownloadEmailText(customerName, items, orderNumber),
  };

  return await sendEmail(emailData);
}

// Función auxiliar para quitar HTML del texto
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}
