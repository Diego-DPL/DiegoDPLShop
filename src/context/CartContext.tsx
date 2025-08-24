import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number; // in cents
  image?: string;
  type?: 'digital' | 'physical';
  downloadUrl?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: 'ADD'; item: Omit<CartItem, 'quantity'>; quantity?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' }
  | { type: 'SET_QTY'; id: string; quantity: number };

const initialState: CartState = { items: [] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const qty = action.quantity ?? 1;
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.item.id ? { ...i, quantity: Math.min(i.quantity + qty, 99) } : i,
          ),
        };
      }
      return {
        items: [{ ...action.item, quantity: Math.min(qty, 99) }, ...state.items],
      };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) };
    case 'SET_QTY':
      return {
        items: state.items.map(i => (i.id === action.id ? { ...i, quantity: Math.max(1, Math.min(action.quantity, 99)) } : i)),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPriceCents: number;
  recentlyAdded: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'diegodplshop_cart_v1';

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as CartState;
    } catch {}
    return initialState;
  });

  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo<CartContextType>(() => {
    const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
    const totalPriceCents = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    
    const addWithAnimation = (item: Omit<CartItem, 'quantity'>, quantity?: number) => {
      dispatch({ type: 'ADD', item, quantity });
      setRecentlyAdded(item.id);
      setTimeout(() => setRecentlyAdded(null), 2000); // La animación dura 2 segundos
    };

    return {
      items: state.items,
      add: addWithAnimation,
      remove: id => dispatch({ type: 'REMOVE', id }),
      setQty: (id, quantity) => dispatch({ type: 'SET_QTY', id, quantity }),
      clear: () => dispatch({ type: 'CLEAR' }),
      totalItems,
      totalPriceCents,
      recentlyAdded,
    };
  }, [state, recentlyAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
