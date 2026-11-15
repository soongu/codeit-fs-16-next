// ~/instagram-next/components/CreateFeedHeader.jsx
import { FaArrowLeft } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";

// 만들기 모달의 헤더 — 사진을 고른 뒤(단계 2)에만 뒤로 버튼과 «공유하기» 버튼이 보인다.
const CreateFeedHeader = ({ step, onBack, onShare }) => {
  return (
    <div className={styles.modalHeader}>
      <button
        className={styles.backButton}
        onClick={onBack}
        style={{ visibility: step > 1 ? "visible" : "hidden" }}
        type="button"
      >
        <FaArrowLeft />
      </button>

      <h2 className={styles.modalTitle}>새 게시물 만들기</h2>

      {step > 1 && (
        <button className={styles.nextButton} onClick={onShare} type="button">
          공유하기
        </button>
      )}
    </div>
  );
};

export default CreateFeedHeader;
