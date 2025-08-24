import type { CartItem } from '../context/CartContext';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export type OrderItem = {
  id: string;
  name: string;
  price: number; // en centavos
  quantity: number;
  type: 'digital' | 'physical';
  downloadUrl?: string;
  image?: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  totalAmount: number; // en centavos
  status: OrderStatus;
  paymentMethod?: string;
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: any; // Firebase Timestamp
  updatedAt: any; // Firebase Timestamp
  completedAt?: any; // Firebase Timestamp
  notes?: string;
};

export type OrderSummary = {
  totalOrders: number;
  totalRevenue: number;
  digitalSales: number;
  physicalSales: number;
  topProducts: Array<{
    id: string;
    name: string;
    totalSales: number;
    revenue: number;
  }>;
};

// Convertir CartItem a OrderItem
export function cartItemToOrderItem(cartItem: CartItem): OrderItem {
  return {
    id: cartItem.id,
    name: cartItem.name,
    price: cartItem.price,
    quantity: cartItem.quantity,
    type: cartItem.type || 'digital',
    downloadUrl: cartItem.downloadUrl,
    image: cartItem.image
  };
}

// Generar número de orden único
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}
