'use client';

import { useState } from 'react';
 
export default function Practice3Page() {
  const [count, setCount] = useState(0);

  return (
    <main className='p-6'>
      <button
        type='button'
        className='rounded border px-4 py-2'
        onClick={() => setCount((prevCount) => prevCount + 1)}>
        박수 {count}번
      </button>
    </main>
  );
}
