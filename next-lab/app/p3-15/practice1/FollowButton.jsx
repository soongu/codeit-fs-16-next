// ~/next-lab/app/p3-15/practice1/FollowButton.jsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProfile } from './useProfile.js';

async function changeFollow(following) {
  const response = await fetch('/p3-15/practice1/api/follow', {
    method: following ? 'PUT' : 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`팔로우를 바꾸지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function FollowButton() {
  const { data } = useProfile();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: changeFollow,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (data === undefined) {
    return null;
  }

  let label = data.following ? '팔로잉' : '팔로우';

  if (isPending) {
    label = '보내는 중…';
  }

  return (
    <div className='mt-4'>
      <button
        type='button'
        className='rounded border px-2'
        onClick={() => mutate(!data.following)}
        disabled={isPending}>
        {label}
      </button>
      {error && (
        <p className='mt-2 text-red-500'>
          팔로우를 바꾸지 못했어요. 잠시 뒤에 다시 눌러 주세요.
        </p>
      )}
    </div>
  );
}
