// ~/next-lab/app/p3-09/practice2/layout.js
import { Suspense } from 'react';
import { connection } from 'next/server';
import { wishlist } from './_data/wishlist.js';

async function WishCount() {
  await connection();

  return <p className='font-semibold'>찜한 책 {wishlist.length}권</p>;
}

export default function WishlistLayout({ children }) {
  return (
    <>
      <header className='border-b p-6'>
        <Suspense
          fallback={
            <p className='font-semibold text-gray-500'>
              찜한 책을 세는 중이에요…
            </p>
          }>
          <WishCount />
        </Suspense>
      </header>
      <section className='p-6'>{children}</section>
    </>
  );
}
