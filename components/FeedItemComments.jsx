// ~/instagram-next/components/FeedItemComments.jsx
import styles from "./FeedItem.module.scss";
const FeedItemComments = ({ commentCount, onOpenDetail }) => {
  return (
    <div className={styles.commentSection}>
      <button type="button" className={styles.viewCommentsButton} onClick={onOpenDetail}>
        댓글 {commentCount.toLocaleString()}개 보기
      </button>
    </div>
  );
};

export default FeedItemComments;
