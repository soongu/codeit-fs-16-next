// ~/instagram-next/components/FeedItemActions.jsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from 'react-icons/fa6';
import styles from './FeedItem.module.scss';

async function changeLike({ postId, liked }) {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: liked ? 'PUT' : 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`좋아요를 바꾸지 못했어요 (${response.status})`);
  }

  return response.json();
}

const FeedItemActions = ({ postId, likeCount, liked }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: changeLike,
    onMutate: async (variables) => {

      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (posts) =>
        posts.map((post) =>
          post.id === variables.postId
            ? {
                ...post,
                liked: variables.liked,
                likeCount: post.likeCount + (variables.liked ? 1 : -1),
              }
            : post,
        ),
      );

      return { previousPosts };
    },
    onError: (error, variables, onMutateResult) => {
      queryClient.setQueryData(['posts'], onMutateResult.previousPosts);
      console.error(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return (
    <div className={styles.actions}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButtons}>
          <button
            type='button'
            className={styles.actionButton}
            onClick={() => mutate({ postId, liked: !liked })}
            disabled={isPending}
            aria-busy={isPending}>
            {liked ? <FaHeart className={styles.liked} /> : <FaRegHeart />}
          </button>
          <button
            type='button'
            className={styles.actionButton}>
            <FaRegComment />
          </button>
          <button
            type='button'
            className={styles.actionButton}>
            <FaRegPaperPlane />
          </button>
        </div>
        <button
          type='button'
          className={styles.actionButton}>
          <FaRegBookmark />
        </button>
      </div>
      <div className={styles.likes}>
        좋아요 <span>{likeCount.toLocaleString()}</span>개
      </div>
    </div>
  );
};

export default FeedItemActions;
