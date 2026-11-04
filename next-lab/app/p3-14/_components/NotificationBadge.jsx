// ~/next-lab/app/p3-14/_components/NotificationBadge.jsx
'use client';

import { useNotifications } from './useNotifications.js';

export default function NotificationBadge() {
  const { data, isPending, isFetching } = useNotifications();

  if (isPending) {
    return <p className='font-semibold'>읽지 않은 알림 …</p>;
  }

  if (data === undefined) {
    return <p className='font-semibold'>알림을 확인하지 못했어요</p>;
  }

  const unread = data.filter((item) => !item.isRead).length;

  return (
    <p className='font-semibold'>
      읽지 않은 알림 {unread}개{isFetching && ' · 새로 확인하는 중'}
    </p>
  );
}
