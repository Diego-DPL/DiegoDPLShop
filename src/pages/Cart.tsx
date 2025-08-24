import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCents } from '../utils/format';

const Cart: React.FC = () => {
  const { items, remove, setQty, totalItems, totalPriceCents, clear } = useCart();
  return (
    <div className="bg-gray-950 min-h-screen py-24 px-4 md:px-8 lg:px-16">
      <h1 className="text-gray-300 text-4xl md:text-6xl font-bold font-plus-jakarta mb-8">Carrito</h1>
      {items.length === 0 ? (
        <p className="text-gray-300/80">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(it => (
              <div key={it.id} className="flex gap-4 p-4 bg-gray-900 rounded-xl border border-white/10">
                <div className="w-28 h-20 bg-gray-800 rounded overflow-hidden">
                  <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-100 font-semibold">{it.name}</h3>
                    <button className="text-gray-400 hover:text-red-400" onClick={() => remove(it.id)}>Quitar</button>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <label className="text-gray-300/80 text-sm">Cantidad</label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={it.quantity}
                      onChange={e => setQty(it.id, Number(e.target.value))}
                      className="w-20 bg-gray-800 text-gray-200 rounded px-2 py-1 border border-white/10"
                    />
                  </div>
                </div>
                <div className="text-lime-300 font-bold">{formatCents(it.price * it.quantity)}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 rounded-xl border border-white/10 p-6 h-fit">
            <div className="flex justify-between text-gray-300 mb-2">
              <span>Artículos</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between text-gray-300 mb-4">
              <span>Total</span>
              <span className="text-lime-300 font-bold">{formatCents(totalPriceCents)}</span>
            </div>
            <div className="flex gap-3">
              <a href="/checkout" className="flex-1 px-4 py-2 bg-lime-400 text-gray-950 rounded-md font-semibold text-center hover:bg-lime-500">
                Pagar
              </a>
              <button onClick={clear} className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md border border-white/10 hover:bg-gray-700">
                Vaciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
