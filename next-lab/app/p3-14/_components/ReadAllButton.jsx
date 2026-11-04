// ~/next-lab/app/p3-14/_components/ReadAllButton.jsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

async function readAllNotifications() {
  const response = await fetch('/p3-14/api/notifications/read', {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error(`알림을 읽음으로 바꾸지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function ReadAllButton() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: readAllNotifications,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return (
    <button
      type='button'
      className='mr-2 rounded border px-2'
      onClick={() => mutate()}
      disabled={isPending}>
      {isPending ? '보내는 중…' : '모두 읽음'}
    </button>
  );
}
