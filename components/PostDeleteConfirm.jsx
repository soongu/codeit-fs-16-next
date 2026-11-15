// ~/instagram-next/components/PostDeleteConfirm.jsx
import styles from "./CreateFeedModal.module.scss";

// 게시물을 정말 지울지 묻는다 — 만들기 모달의 «게시물을 삭제하시겠어요?» 와 같은 마크업이고 글자만 다르다.
// «삭제» 를 누르면 onConfirm, «취소» 를 누르면 onCancel 을 부른다. 지우는 동안에는 «삭제» 를 누를 수 없다.
const PostDeleteConfirm = ({ isDeleting, onConfirm, onCancel }) => (
  <div className={styles.modalContainer}>
    <div className={styles.nestedModal}>
      <div className={styles.nestedModalContent}>
        <div className={styles.nestedModalTitle}>
          <h3>게시물을 삭제하시겠어요?</h3>
          <p>삭제한 게시물은 되돌릴 수 없습니다.</p>
        </div>
        <div className={styles.nestedModalButtons}>
          <button className={styles.deleteButton} onClick={onConfirm} disabled={isDeleting} type="button">
            삭제
          </button>
          <button className={styles.cancelButton} onClick={onCancel} type="button">
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default PostDeleteConfirm;
