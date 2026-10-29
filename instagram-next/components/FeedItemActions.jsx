// ~/instagram-next/components/FeedItemActions.jsx
'use client';

import { useState } from 'react';
import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from 'react-icons/fa6';
import styles from './FeedItem.module.scss';

const FeedItemActions = ({ likeCount }) => {
  const [like, setLike] = useState({ liked: false, count: likeCount });

  const handleLike = () => {

    console.log('좋아요 버튼에서 읽은 주소:', process.env.NEXT_PUBLIC_SITE_URL);

    setLike({
      ...like,
      liked: !like.liked,
      count: like.liked ? like.count - 1 : like.count + 1,
    });
  };

  return (
    <div className={styles.actions}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButtons}>
          <button
            type='button'
            className={styles.actionButton}
            onClick={handleLike}>
            {like.liked ? <FaHeart className={styles.liked} /> : <FaRegHeart />}
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
        좋아요 <span>{like.count.toLocaleString()}</span>개
      </div>
    </div>
  );
};

export default FeedItemActions;
