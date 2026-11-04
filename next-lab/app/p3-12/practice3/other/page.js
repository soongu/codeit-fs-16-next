// ~/next-lab/app/p3-12/practice3/other/page.js
import Link from 'next/link';

export default function OtherPage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>다른 화면</h2>
      <Link
        href='/p3-12/practice3'
        className='mt-4 inline-block underline'>
        돌아가기
      </Link>
    </main>
  );
}
