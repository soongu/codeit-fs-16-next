// ~/next-lab/app/p3-14/error.js
'use client';

import { useEffect } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export default function ErrorPage({ error, retry }) {
  const { reset } = useQueryErrorResetBoundary();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    reset();
    retry();
  };

  return (
    <main className='p-6'>
      <p className='text-red-500'>
        화면을 불러오지 못했어요. 잠시 뒤에 다시 시도해 주세요.
      </p>
      <button
        type='button'
        className='mt-2 rounded border px-2'
        onClick={handleRetry}>
        다시 시도
      </button>
    </main>
  );
}
