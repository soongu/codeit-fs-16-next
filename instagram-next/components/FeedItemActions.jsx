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
import { MY_USER_ID } from '@/utils/me.js';

// 받아 둔 페이지들을 돌며 게시물 하나만 바꾼 새 데이터를 만든다.
// change 는 그 게시물을 받아 바꿀 필드만 돌려주는 함수다.
function changePost(data, postId, change) {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map((post) => (post.id === postId ? { ...post, ...change(post) } : post)),
    })),
  };
}

async function changeLike({ postId, liked }) {
  const response = await fetch(`/api/posts/${postId}/likes/${MY_USER_ID}`, {
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
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (data) =>
        changePost(data, variables.postId, (post) => ({
          liked: variables.liked,
          likeCount: post.likeCount + (variables.liked ? 1 : -1),
        })),
      );

      return { previousPosts };
    },
    onSuccess: (result, variables) => {
      // 서버가 돌려준 { liked, likeCount } 로 그 게시물만 맞춘다.
      queryClient.setQueryData(['posts'], (data) =>
        changePost(data, variables.postId, () => result),
      );
    },
    onError: async (error, variables, onMutateResult) => {
      queryClient.setQueryData(['posts'], onMutateResult.previousPosts);
      console.error(error);
      // 실패했을 때만 서버의 지금 모습을 다시 받는다.
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
