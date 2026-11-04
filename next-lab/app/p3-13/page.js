// ~/next-lab/app/p3-13/page.js
import Link from 'next/link';
import NotificationBadge from './_components/NotificationBadge.jsx';
import NotificationPanel from './_components/NotificationPanel.jsx';

export default function NotificationPage() {
  return (
    <main className='p-6'>
      <header className='border-b pb-4'>
        <h2 className='text-xl font-semibold'>알림</h2>
        <NotificationBadge />
        <Link
          href='/p3-13/explore'
          className='underline'>
          둘러보기
        </Link>
      </header>
      <NotificationPanel />
    </main>
  );
}
