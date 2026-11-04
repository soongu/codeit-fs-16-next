// ~/next-lab/app/p3-13/practice2/other/page.js
import Link from 'next/link';

export default function OtherPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>다른 화면</h2>
      <Link
        href='/p3-13/practice2'
        className='mt-4 inline-block underline'>
        돌아가기
      </Link>
    </main>
  );
}
