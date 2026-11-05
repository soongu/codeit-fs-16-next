// ~/next-lab/app/p3-17/practice1/ProductList.jsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { MY_USER_ID } from './me.js';

async function getProducts() {
  const response = await fetch(`/p3-17/practice1/api?userId=${MY_USER_ID}`);

  if (!response.ok) {
    throw new Error(`상품을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function ProductList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  if (data === undefined) {
    return <p className='mt-4'>{error.message}</p>;
  }

  return (
    <ul className='mt-4 space-y-2'>
      {data.map((product) => (
        <li key={product.id}>
          {product.name} — 찜 {product.wishCount}개
          {product.wished && ' · 내가 찜함'}
        </li>
      ))}
    </ul>
  );
}
