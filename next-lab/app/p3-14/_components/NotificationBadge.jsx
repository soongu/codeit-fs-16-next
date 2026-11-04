// ~/next-lab/app/p3-14/_components/NotificationBadge.jsx
'use client';

import { useNotifications } from './useNotifications.js';

function countUnread(notifications) {
  return notifications.filter((item) => !item.isRead).length;
}

export default function NotificationBadge() {
  const { data, isPending, isFetching } = useNotifications(countUnread);

  if (isPending) {
    return <p className='font-semibold'>읽지 않은 알림 …</p>;
  }

  return (
    <p className='font-semibold'>
      읽지 않은 알림 {data}개{isFetching && ' · 새로 확인하는 중'}
    </p>
  );
}
