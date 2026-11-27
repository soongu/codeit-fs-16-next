// ~/instagram-next/components/CreateFeedDiscard.jsx
import styles from "./CreateFeedModal.module.scss";

// 글쓰기 단계에서 만들기 모달을 닫으려 하면 모달 위에 띄워 정말 버릴지 묻는다.
// «삭제» 를 누르면 onConfirm, «취소» 를 누르면 onCancel 을 부른다.
const CreateFeedDiscard = ({ onConfirm, onCancel }) => (
  <div className={styles.nestedModal}>
    <div className={styles.nestedModalContent}>
      <div className={styles.nestedModalTitle}>
        <h3>게시물을 삭제하시겠어요?</h3>
        <p>지금 나가면 수정 내용이 저장되지 않습니다.</p>
      </div>
      <div className={styles.nestedModalButtons}>
        <button className={styles.deleteButton} onClick={onConfirm} type="button">
          삭제
        </button>
        <button className={styles.cancelButton} onClick={onCancel} type="button">
          취소
        </button>
      </div>
    </div>
  </div>
);

export default CreateFeedDiscard;
