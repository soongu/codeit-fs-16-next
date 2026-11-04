// ~/next-lab/app/p3-13/practice2/page.js
import Link from 'next/link';
import ResponseCount from './ResponseCount.jsx';

export default function CountPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>다시 받는 순간 세기</h2>
      <ResponseCount />
      <Link
        href='/p3-13/practice2/other'
        className='mt-4 inline-block underline'>
        다른 화면
      </Link>
    </main>
  );
}
