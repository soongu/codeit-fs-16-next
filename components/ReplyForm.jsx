// ~/instagram-next/components/ReplyForm.jsx
import { useState } from "react";
import styles from "./PostDetailModal.module.scss";
import { ApiError } from "@/services/api.js";
import { useAddComment } from "@/hooks/useAddComment.js";
import { useUiStore } from "@/stores/useUiStore.js";

// 원댓글 아래에 여는 답글 입력창이다. 답글은 늘 원댓글(rootId)에 단다.
// 답글 줄의 «답글 달기» 를 눌러도 그 답글이 달린 원댓글에 단다. 누구에게 하는 말인지는 입력창 맨 앞의 «@이름» 이 알려 준다.
// rootUsername 은 원댓글을 쓴 사람이고 targetUsername 은 «답글 달기» 를 누른 줄을 쓴 사람이다.
const ReplyForm = ({ postId, rootId, rootUsername, targetUsername, viewerId, onReplied }) => {
  const [content, setContent] = useState(`@${targetUsername} `);
  const { mutate, isPending } = useAddComment(viewerId);
  const showToast = useUiStore((state) => state.showToast);

  // 앞뒤 공백을 뗀 글이 비었거나 보내는 중이면 «게시» 를 누를 수 없다.
  const canSubmit = content.trim() !== "" && !isPending;

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      { postId, content: content.trim(), parentId: rootId },
      {
        // 달았으면 입력창을 닫는다.
        onSuccess: () => onReplied(),
        // 달지 못했으면 쓴 글을 그대로 두고 알림을 띄운다.
        onError: (error) => {
          showToast(error instanceof ApiError ? error.message : "답글을 달지 못했어요. 다시 시도해 주세요.", "error");
        },
      },
    );
  };

  return (
    <form className={styles.replyForm} onSubmit={handleSubmit}>
      <input
        className={styles.replyInput}
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`@${rootUsername} 답글을 입력하세요`}
      />
      <button
        className={styles.replySubmitButton}
        type="submit"
        disabled={!canSubmit}
      >
        게시
      </button>
    </form>
  );
};

export default ReplyForm;
