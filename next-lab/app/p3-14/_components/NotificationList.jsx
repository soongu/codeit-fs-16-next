// ~/next-lab/app/p3-14/_components/NotificationList.jsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from './useNotifications.js';

async function readNotification(id) {
  const response = await fetch(`/p3-14/api/notifications/${id}/read`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error(`알림을 읽음으로 바꾸지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function NotificationList() {
  const { data, isPending, isFetching, error, refetch } = useNotifications();
  const queryClient = useQueryClient();
  const readOne = useMutation({
    mutationFn: readNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  if (isPending) {
    return <p className='mt-4'>불러오는 중…</p>;
  }

  return (
    <>
      {error && (
        <p className='mt-4 text-red-500'>
          알림을 새로 받지 못했어요. 아래는 그전에 받은 알림이에요.
          <button
            type='button'
            className='ml-2 rounded border px-2'
            onClick={() => refetch()}
            disabled={isFetching}>
            {isFetching ? '받는 중…' : '다시 시도'}
          </button>
        </p>
      )}
      <ul className='mt-4 space-y-2'>
        {data.map((item) => (
          <li
            key={item.id}
            className={item.isRead ? 'text-gray-400' : ''}>
            {item.text}
            {!item.isRead && (
              <button
                type='button'
                className='ml-2 rounded border px-2'
                onClick={() => readOne.mutate(item.id)}
                disabled={readOne.isPending}>
                {readOne.isPending && readOne.variables === item.id
                  ? '보내는 중…'
                  : '읽음'}
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
