// ~/next-lab/app/p3-09/practice2/page.js
import { Suspense } from 'react';
import { connection } from 'next/server';
import { wishlist } from './_data/wishlist.js';
import WishButton from './_components/WishButton.jsx';

const books = [
  { id: 1, title: '어린 왕자' },
  { id: 2, title: '데미안' },
  { id: 3, title: '모모' },
];

async function BookList() {
  await connection();

  return (
    <ul className='space-y-2'>
      {books.map((book) => (
        <li
          key={book.id}
          className='flex gap-3'>
          <span>{book.title}</span>
          <WishButton
            id={book.id}
            wished={wishlist.includes(book.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default function WishlistPage() {
  return (
    <Suspense
      fallback={<p className='text-gray-500'>목록을 불러오는 중이에요…</p>}>
      <BookList />
    </Suspense>
  );
}
