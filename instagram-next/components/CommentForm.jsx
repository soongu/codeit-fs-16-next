// ~/instagram-next/components/CommentForm.jsx
import styles from './FeedItem.module.scss';

const CommentForm = () => {
  return (
    <form className={styles.commentForm}>
      <input
        type='text'
        placeholder='댓글 달기...'
        className={styles.commentInput}
      />
      <button
        type='submit'
        className={styles.commentSubmit}
        disabled>
        게시
      </button>
    </form>
  );
};

export default CommentForm;
