// ~/next-lab/app/p3-18/practice1/CartBadge.jsx
'use client';

import { useCartStore } from './useCartStore.js';

export default function CartBadge() {
  const count = useCartStore((state) => state.items.length);

  return (
    <p className='rounded bg-black px-3 py-1 text-white'>장바구니 {count}개</p>
  );
}
