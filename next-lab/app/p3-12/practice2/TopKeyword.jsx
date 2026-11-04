// ~/next-lab/app/p3-12/practice2/TopKeyword.jsx
'use client';

import { useTrending } from './useTrending.js';

export default function TopKeyword() {
  const { data, isPending } = useTrending();

  if (isPending) {
    return <p className='font-semibold'>지금 1위 …</p>;
  }

  return <p className='font-semibold'>지금 1위 {data.keywords[0]}</p>;
}
