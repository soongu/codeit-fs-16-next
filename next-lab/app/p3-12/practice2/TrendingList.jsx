// ~/next-lab/app/p3-12/practice2/TrendingList.jsx
'use client';

import { useTrending } from './useTrending.js';

export default function TrendingList() {
  const { data, isPending, error } = useTrending();

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  if (error) {
    return <p className='mt-4'>{error.message}</p>;
  }

  return (
    <section className='mt-4'>
      <p className='text-sm text-gray-500'>{data.checkedAt} 기준</p>
      <ol className='mt-2 list-decimal pl-6'>
        {data.keywords.map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ol>
    </section>
  );
}
