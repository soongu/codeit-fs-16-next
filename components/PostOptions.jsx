// ~/instagram-next/components/PostOptions.jsx
import { useState } from "react";
import styles from "./CreateFeedModal.module.scss";
import PostEditModal from "./PostEditModal.jsx";
import DeleteConfirm from "./DeleteConfirm.jsx";
import { ApiError } from "@/services/api.js";
import { useMe } from "@/hooks/useMe.js";
import { useDeletePost } from "@/hooks/useDeletePost.js";
import { useUiStore } from "@/stores/useUiStore.js";

// 게시물의 «…» 를 누르면 화면 위에 띄우는 메뉴 — 만들기 모달의 «삭제/취소» 확인과 같은 마크업이다.
// 내 게시물이면 «삭제»·«수정», 관리자가 보는 남의 게시물이면 «삭제» 만 보인다. 그 밖에는 «취소» 하나다.
// 지운 뒤 어디로 갈지(onDeleted)는 메뉴를 띄운 쪽이 정한다 — 모달과 페이지가 다르다.
const PostOptions = ({ post, onClose, onDeleted }) => {
  const { data: me } = useMe();
  // 지금 무엇을 보여 주나 — "menu"(메뉴) · "edit"(정보 수정) · "delete"(지우기 확인)
  const [view, setView] = useState("menu");
  const { mutate, isPending } = useDeletePost(me.id);
  const showToast = useUiStore((state) => state.showToast);
  const isMine = post.authorId === me.id;
  const canDelete = isMine || me.role === "ADMIN";

  // 지우기 확인의 «삭제» — 지우고 나면 onDeleted 로 지운 게시물의 화면을 떠난다. 실패하면 알림을 띄우고 확인은 그대로 둔다.
  const handleDelete = () => {
    mutate(post.id, {
      onSuccess: onDeleted,
      onError: (error) => {
        showToast(error instanceof ApiError ? error.message : "게시물을 삭제하지 못했어요. 다시 시도해 주세요.", "error");
      },
    });
  };

  // «수정» 을 누르면 메뉴 대신 정보 수정 화면을 보여 준다 — 닫으면 메뉴로 돌아가지 않고 함께 닫힌다.
  if (view === "edit") {
    return <PostEditModal post={post} onClose={onClose} />;
  }

  // «삭제» 를 누르면 메뉴 대신 정말 지울지 묻는다 — «취소» 를 누르면 함께 닫힌다.
  if (view === "delete") {
    return <DeleteConfirm isDeleting={isPending} onConfirm={handleDelete} onCancel={onClose} />;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.nestedModal}>
        <div className={styles.nestedModalContent}>
          <div className={styles.nestedModalButtons}>
            {canDelete && (
              <button className={styles.deleteButton} onClick={() => setView("delete")} type="button">
                삭제
              </button>
            )}
            {isMine && (
              <button className={styles.cancelButton} onClick={() => setView("edit")} type="button">
                수정
              </button>
            )}
            <button className={styles.cancelButton} onClick={onClose} type="button">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostOptions;
