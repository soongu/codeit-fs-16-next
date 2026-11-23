// ~/instagram-next/components/CommentForm.jsx
import { useState } from "react";
import styles from "./FeedItem.module.scss";
import { ApiError } from "@/services/api.js";
import { useAddComment } from "@/hooks/useAddComment.js";
import { useUiStore } from "@/stores/useUiStore.js";

// 피드 카드와 상세 모달이 함께 쓰는 댓글 입력창이다. 어느 게시물에 달지는 postId 로 받는다.
// viewerId 는 지금 보는 사람이다. 댓글 수를 바꿀 캐시의 키를 맞추는 데 쓴다.
const CommentForm = ({ postId, viewerId }) => {
  const [content, setContent] = useState("");
  const { mutate, isPending } = useAddComment(viewerId);
  const showToast = useUiStore((state) => state.showToast);

  // 앞뒤 공백을 뗀 글이 비었거나 보내는 중이면 «게시» 를 누를 수 없다.
  const canSubmit = content.trim() !== "" && !isPending;

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      { postId, content: content.trim() },
      {
        // 달았으면 입력창을 비운다.
        onSuccess: () => setContent(""),
        // 달지 못했으면 쓴 글을 그대로 두고 알림을 띄운다.
        onError: (error) => {
          showToast(error instanceof ApiError ? error.message : "댓글을 달지 못했어요. 다시 시도해 주세요.", "error");
        },
      },
    );
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="댓글 달기..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.commentInput}
      />
      <button
        type="submit"
        className={styles.commentSubmit}
        disabled={!canSubmit}
      >
        게시
      </button>
    </form>
  );
};

export default CommentForm;
