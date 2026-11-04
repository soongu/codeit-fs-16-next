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
  const { mutate, isPending, error } = useMutation({
    mutationFn: readAllNotifications,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });


  return (
    <>
      <button
        type='button'
        className='mr-2 rounded border px-2'
        onClick={() => mutate()}
        disabled={isPending}>
        {isPending ? '보내는 중…' : '모두 읽음'}
      </button>
      {error && (
        <span className='mr-2 text-red-500'>
          읽음으로 바꾸지 못했어요. 잠시 뒤에 다시 눌러 주세요.
        </span>
      )}
    </>
  );
}
