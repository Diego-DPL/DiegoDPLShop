import { useState } from 'react';

interface UseSecureDownloadProps {
  productId: string;
  userId: string;
  orderNumber: string;
}

interface DownloadStatus {
  isLoading: boolean;
  error: string | null;
  downloadUrl: string | null;
}

export function useSecureDownload() {
  const [status, setStatus] = useState<DownloadStatus>({
    isLoading: false,
    error: null,
    downloadUrl: null
  });

  const generateSecureDownload = async ({ productId, userId, orderNumber }: UseSecureDownloadProps) => {
    setStatus({ isLoading: true, error: null, downloadUrl: null });

    try {
      // Generar un token temporal para la descarga
      const token = generateDownloadToken(productId, userId, orderNumber);
      
      // En una implementación real, este sería un endpoint de tu backend
      // que verifica la compra y genera un enlace temporal
      const baseUrl = 'https://diegodpl.com/api/secure-download';
      const secureUrl = `${baseUrl}?token=${token}&product=${productId}&order=${orderNumber}`;

      setStatus({
        isLoading: false,
        error: null,
        downloadUrl: secureUrl
      });

      return secureUrl;
    } catch (error) {
      setStatus({
        isLoading: false,
        error: 'Error al generar el enlace de descarga',
        downloadUrl: null
      });
      throw error;
    }
  };

  const validateDownloadUrl = (url: string): boolean => {
    // Verificar que no sea un URL de preview
    const invalidPatterns = [
      'preview',
      'sample',
      'demo',
      'audio-previews',
      '.mp3'  // Los previews suelen ser MP3
    ];

    return !invalidPatterns.some(pattern => 
      url.toLowerCase().includes(pattern.toLowerCase())
    );
  };

  const sanitizeDownloadUrl = (originalUrl: string, productId: string, orderNumber: string): string => {
    if (!originalUrl || !validateDownloadUrl(originalUrl)) {
      // Si el URL original es inválido o es un preview, generar uno seguro
      return generateDownloadToken(productId, 'unknown', orderNumber);
    }
    return originalUrl;
  };

  return {
    ...status,
    generateSecureDownload,
    validateDownloadUrl,
    sanitizeDownloadUrl
  };
}

// Función auxiliar para generar tokens de descarga
function generateDownloadToken(productId: string, userId: string, orderNumber: string): string {
  const timestamp = Date.now();
  const data = `${productId}:${userId}:${orderNumber}:${timestamp}`;
  
  // En una implementación real, usarías una clave secreta para firmar el token
  const token = btoa(data);
  
  return `https://diegodpl.com/api/secure-download?token=${token}&expires=${timestamp + (24 * 60 * 60 * 1000)}`;
}

// Función para detectar si un archivo es un preview
export function isPreviewFile(url: string): boolean {
  if (!url) return false;
  
  const previewIndicators = [
    'preview',
    'sample',
    'demo',
    'audio-previews',
    '/previews/',
    '_preview',
    '-preview',
    '.mp3'  // Generalmente los previews son MP3
  ];

  return previewIndicators.some(indicator => 
    url.toLowerCase().includes(indicator.toLowerCase())
  );
}

// Función para limpiar URLs de productos
export function cleanProductUrls(downloadUrl: string | undefined): string | null {
  if (!downloadUrl) return null;
  
  // Si es un archivo de preview, retornar null para que se maneje como "no disponible"
  if (isPreviewFile(downloadUrl)) {
    console.warn(`Preview URL detected and removed: ${downloadUrl}`);
    return null;
  }
  
  return downloadUrl;
}
