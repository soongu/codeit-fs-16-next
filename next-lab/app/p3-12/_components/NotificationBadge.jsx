// ~/next-lab/app/p3-12/_components/NotificationBadge.jsx
'use client';

import { useNotifications } from './useNotifications.js';

export default function NotificationBadge() {
  const { notifications, isLoading } = useNotifications();

  if (isLoading) {
    return <p className='font-semibold'>읽지 않은 알림 …</p>;
  }

  const unread = notifications.filter((item) => !item.isRead).length;

  return <p className='font-semibold'>읽지 않은 알림 {unread}개</p>;
}
