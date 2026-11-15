// ~/instagram-next/components/CreateFeedHeader.jsx
import { FaArrowLeft, FaSpinner } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";

// 만들기 모달의 헤더 — 사진을 고른 뒤(단계 2)에만 뒤로 버튼과 «공유하기» 버튼이 보인다.
// 올리는 동안에는 뒤로 버튼을 감추고, «공유하기» 를 누를 수 없게 한 뒤 그 대신 기다리는 표시를 보여 준다.
// 정보 수정 화면도 이 헤더를 쓴다 — 제목과 버튼 글자를 받고, 뒤로 갈 곳(onBack)을 안 받으면 뒤로 버튼을 감춘다.
const CreateFeedHeader = ({ step, isSharing, onBack, onShare, title = "새 게시물 만들기", shareLabel = "공유하기" }) => {
  return (
    <div className={styles.modalHeader}>
      <button
        className={styles.backButton}
        onClick={onBack}
        style={{ visibility: step > 1 && onBack && !isSharing ? "visible" : "hidden" }}
        type="button"
      >
        <FaArrowLeft />
      </button>

      <h2 className={styles.modalTitle}>{title}</h2>

      {step > 1 && (
        <button
          className={`${styles.nextButton} ${isSharing ? styles.loading : ""}`}
          onClick={onShare}
          disabled={isSharing}
          type="button"
        >
          {shareLabel}
        </button>
      )}

      {isSharing && (
        <div className={styles.loadingSpinner}>
          <FaSpinner />
        </div>
      )}
    </div>
  );
};

export default CreateFeedHeader;
