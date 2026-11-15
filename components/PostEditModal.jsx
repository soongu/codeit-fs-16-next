// ~/instagram-next/components/PostEditModal.jsx
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import styles from "./CreateFeedModal.module.scss";
import CreateFeedHeader from "./CreateFeedHeader.jsx";
import CreateFeedWrite from "./CreateFeedWrite.jsx";
import { ApiError } from "@/services/api.js";
import { useMe } from "@/hooks/useMe.js";
import { useUpdatePost } from "@/hooks/useUpdatePost.js";
import { useUiStore } from "@/stores/useUiStore.js";

// 게시물의 글을 고치는 화면 — 만들기 모달의 글쓰기 단계를 그대로 쓰고, 제목과 버튼 글자만 다르다.
// 사진은 고칠 수 없다 — 왼쪽에는 게시물의 지금 사진을 보여 주기만 한다.
const PostEditModal = ({ post, onClose }) => {
  // 지금 글을 채워서 연다.
  const [content, setContent] = useState(post.content);
  const { data: me } = useMe();
  const { mutate, isPending } = useUpdatePost(me.id);
  const showToast = useUiStore((state) => state.showToast);

  // «완료» — 고친 글을 보내고, 성공하면 화면을 닫는다. 실패하면 알림을 띄우고 화면은 그대로 둔다.
  const handleSave = () => {
    mutate(
      { postId: post.id, content },
      {
        onSuccess: onClose,
        onError: (error) => {
          showToast(error instanceof ApiError ? error.message : "게시물을 고치지 못했어요. 다시 시도해 주세요.", "error");
        },
      },
    );
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBackdrop} onClick={onClose} />

      <button className={styles.modalCloseButton} onClick={onClose} type="button">
        <FaXmark />
      </button>

      <div className={styles.modalContent}>
        {/* 단계가 하나뿐이라 늘 글쓰기 단계(2)의 헤더다 — 뒤로 갈 곳이 없어 onBack 을 넘기지 않는다. */}
        <CreateFeedHeader step={2} title="정보 수정" shareLabel="완료" isSharing={isPending} onShare={handleSave} />

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
