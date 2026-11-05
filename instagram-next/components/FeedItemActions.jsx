// ~/instagram-next/components/FeedItemActions.jsx
'use client';

import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from 'react-icons/fa6';
import styles from './FeedItem.module.scss';
import { useLikePost } from '@/hooks/useLikePost.js';



const FeedItemActions = ({ postId, likeCount, liked }) => {
  
  const { mutate, isPending } = useLikePost();

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
