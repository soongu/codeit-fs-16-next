// ~/instagram-next/components/FeedItemActions.jsx
import {
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from 'react-icons/fa6';
import styles from './FeedItem.module.scss';

const FeedItemActions = ({ likeCount }) => {
  return (
    <div className={styles.actions}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButtons}>
          <button
            type='button'
            className={styles.actionButton}>
            <FaRegHeart />
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
