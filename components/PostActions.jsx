// ~/instagram-next/components/PostActions.jsx
import { FaHeart, FaRegBookmark, FaRegComment, FaRegHeart, FaRegPaperPlane } from "react-icons/fa6";
import styles from "./PostDetailModal.module.scss";

const PostActions = ({ likeCount, liked, isPending, onToggleLike }) => {
  return (
    <div className={styles.postActions}>
      <div className={styles.actionButtons}>
        <div className={styles.actionButtonsLeft}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={onToggleLike}
            disabled={isPending}
            aria-busy={isPending}
          >
            {liked ? <FaHeart className={styles.liked} /> : <FaRegHeart />}
          </button>
          <button className={styles.actionButton}><FaRegComment /></button>
          <button type="button" className={styles.actionButton}>
            <FaRegPaperPlane />
          </button>
        </div>
        <button className={styles.actionButton}><FaRegBookmark /></button>
      </div>
      <div className={styles.likesCount}>좋아요 {likeCount.toLocaleString()}개</div>
    </div>
  );
};

export default PostActions;
