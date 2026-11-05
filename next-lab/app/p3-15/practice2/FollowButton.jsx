// ~/next-lab/app/p3-15/practice2/FollowButton.jsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProfile } from './useProfile.js';

async function changeFollow(following) {
  const response = await fetch('/p3-15/practice2/api/follow', {
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
    onMutate: (following) => {
      const previousProfile = queryClient.getQueryData(['profile']);

      queryClient.setQueryData(['profile'], (profile) => ({
        ...profile,
        following,
        followerCount: profile.followerCount + (following ? 1 : -1),
      }));

      return { previousProfile };
    },
    onError: (error, following, onMutateResult) => {
      queryClient.setQueryData(['profile'], onMutateResult.previousProfile);
      console.error(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  if (data === undefined) {
    return null;
  }

  return (
    <div className='mt-4'>
      <button
        type='button'
        className='rounded border px-2'
        onClick={() => mutate(!data.following)}
        disabled={isPending}>
        {data.following ? '팔로잉' : '팔로우'}
      </button>
      {error && (
        <p className='mt-2 text-red-500'>
          팔로우를 바꾸지 못했어요. 잠시 뒤에 다시 눌러 주세요.
        </p>
      )}
    </div>
  );
}
