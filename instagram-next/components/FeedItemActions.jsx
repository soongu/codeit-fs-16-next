// ~/instagram-next/components/FeedItemActions.jsx
'use client';

import { useTransition } from 'react';
import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from 'react-icons/fa6';
import styles from './FeedItem.module.scss';
import { likePost, unlikePost } from '@/app/actions.js';

const FeedItemActions = ({ postId, likeCount, liked }) => {
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      if (liked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    });
  };

  return (
    <div className={styles.actions}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButtons}>
          <button
            type='button'
            className={styles.actionButton}
            onClick={handleLike}
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
