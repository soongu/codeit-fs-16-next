// ~/instagram-next/components/PostEditModal.jsx
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";
import CreateFeedHeader from "./CreateFeedHeader.jsx";
import CreateFeedWrite from "./CreateFeedWrite.jsx";

// 게시물의 글을 고치는 화면 — 만들기 모달의 글쓰기 단계를 그대로 쓰고, 제목과 버튼 글자만 다르다.
// 사진은 고칠 수 없다 — 왼쪽에는 게시물의 지금 사진을 보여 주기만 한다.
const PostEditModal = ({ post, onClose }) => {
  // 지금 글을 채워서 연다.
  const [content, setContent] = useState(post.content);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBackdrop} onClick={onClose} />

      <button className={styles.modalCloseButton} onClick={onClose} type="button">
        <FaXmark />
      </button>

      <div className={styles.modalContent}>
        {/* 단계가 하나뿐이라 늘 글쓰기 단계(2)의 헤더다 — 뒤로 갈 곳이 없어 onBack 을 넘기지 않는다. */}
        <CreateFeedHeader step={2} title="정보 수정" shareLabel="완료" isSharing={false} />

        <div className={styles.modalBody}>
          <div className={`${styles.step} ${styles.active}`}>
            <CreateFeedWrite
              previewUrls={post.imageUrls}
              imageAlt={post.postAlt}
              content={content}
              onContentChange={setContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditModal;
