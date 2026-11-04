// ~/next-lab/app/p3-12/_components/NotificationList.jsx
'use client';

import { useNotifications } from './useNotifications.js';

export default function NotificationList() {
  const { notifications, isLoading, error } = useNotifications();

  if (isLoading) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  if (error) {
    return <p className='mt-4'>{error.message}</p>;
  }

  return (
    <ul className='mt-4 space-y-2'>
      {notifications.map((item) => (
        <li
          key={item.id}
          className={item.isRead ? 'text-gray-400' : ''}>
          {item.text}
        </li>
      ))}
    </ul>
  );
}
