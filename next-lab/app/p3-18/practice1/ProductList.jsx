// ~/next-lab/app/p3-18/practice1/ProductList.jsx
'use client';

import { useCartStore } from './useCartStore.js';

const products = [
  { id: 1, name: '캔버스 토트백' },
  { id: 2, name: '도자기 머그컵' },
  { id: 3, name: '필름 카메라 스트랩' },
];

export default function ProductList() {
  const addItem = useCartStore((state) => state.addItem);
  console.log('[render] ProductList');

  return (
    <ul className='mt-4 space-y-2'>
      {products.map((product) => (
        <li
          key={product.id}
          className='flex items-center gap-2'>
          {product.name}
          <button
            type='button'
            className='rounded border px-2'
            onClick={() => addItem(product)}>
            담기
          </button>
        </li>
      ))}
    </ul>
  );
}
