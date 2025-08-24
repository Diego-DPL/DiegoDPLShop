export function formatCents(cents: number, currency: string = 'EUR') {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(cents / 100);
}

export function getStripePublishableKey() {
  return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
}
