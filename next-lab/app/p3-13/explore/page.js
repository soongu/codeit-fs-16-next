// ~/next-lab/app/p3-13/explore/page.js
import Link from 'next/link';

export default function ExplorePage() {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>둘러보기</h2>
      <Link
        href='/p3-13'
        className='mt-4 inline-block underline'>
        알림으로
      </Link>
    </main>
  );
}
