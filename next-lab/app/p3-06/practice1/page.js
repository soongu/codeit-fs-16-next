// ~/next-lab/app/p3-06/practice1/page.js
import { Suspense } from 'react';
import { connection } from 'next/server';

async function Clock() {
  await connection();

  return (
    <p className='mt-4 text-3xl'>{new Date().toLocaleTimeString('ko-KR')}</p>
  );
}

export default function Practice1Page() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>이 화면을 연 시각</h2>
      <Suspense
        fallback={<p className='mt-4 text-3xl'>시각을 불러오는 중이에요</p>}>
        <Clock />
      </Suspense>
    </main>
  );
}
