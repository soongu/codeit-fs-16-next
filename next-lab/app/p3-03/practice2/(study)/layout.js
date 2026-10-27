// ~/next-lab/app/p3-03/practice2/(study)/layout.js
import Link from 'next/link';

export default function StudyLayout({ children }) {
  return (
    <main className='p-6'>
      <h2 className='text-xl font-semibold'>공부방</h2>
      <nav className='mt-4 flex gap-4'>
        <Link
          href='/p3-03/practice2'
          className='underline'>
          처음
        </Link>
        <Link
          href='/p3-03/practice2/korean'
          className='underline'>
          국어
        </Link>
        <Link
          href='/p3-03/practice2/math'
          className='underline'>
          수학
        </Link>
        <Link
          href='/p3-03/practice2/break'
          className='underline'>
          쉬는 시간
        </Link>
      </nav>
      <div className='mt-6'>{children}</div>
    </main>
  );
}
