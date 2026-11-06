// ~/next-lab/app/p3-18/practice2/CartPanel.jsx
'use client';

import { useCartStore } from './useCartStore.js';

export default function CartPanel() {
  const isOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className='fixed inset-0 bg-black/30'
        onClick={closeCart}
      />
      <aside className='fixed inset-y-0 right-0 w-72 bg-white p-6 shadow-lg'>
        <h3 className='text-lg font-semibold'>장바구니</h3>
        <ul className='mt-4 space-y-1'>
          {/* 같은 상품을 두 번 담을 수 있어서 차례 번호로 구분한다. */}
          {items.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
        <button
          type='button'
          className='mt-4 rounded border px-2'
          onClick={closeCart}>
          닫기
        </button>
      </aside>
    </>
  );
}
