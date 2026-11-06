// ~/next-lab/app/p3-18/practice2/CartButton.jsx
'use client';

import { useCartStore } from './useCartStore.js';

export default function CartButton() {
  const count = useCartStore((state) => state.items.length);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <button
      type='button'
      className='rounded bg-black px-3 py-1 text-white'
      onClick={openCart}>
      장바구니 {count}개
    </button>
  );
}
