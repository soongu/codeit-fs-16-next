// ~/instagram-next/components/PostOptions.jsx
import { useState } from "react";
import styles from "./CreateFeedModal.module.scss";
import PostEditModal from "./PostEditModal.jsx";
import { useMe } from "@/hooks/useMe.js";

// 게시물의 «…» 를 누르면 화면 위에 띄우는 메뉴 — 만들기 모달의 «삭제/취소» 확인과 같은 마크업이다.
// 내 게시물이면 «삭제»·«수정», 관리자가 보는 남의 게시물이면 «삭제» 만 보인다. 그 밖에는 «취소» 하나다.
const PostOptions = ({ post, onClose }) => {
  const { data: me } = useMe();
  // 지금 무엇을 보여 주나 — "menu"(메뉴) · "edit"(정보 수정)
  const [view, setView] = useState("menu");
  const isMine = post.authorId === me.id;
  const canDelete = isMine || me.role === "ADMIN";

  // «수정» 을 누르면 메뉴 대신 정보 수정 화면을 보여 준다 — 닫으면 메뉴로 돌아가지 않고 함께 닫힌다.
  if (view === "edit") {
    return <PostEditModal post={post} onClose={onClose} />;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.nestedModal}>
        <div className={styles.nestedModalContent}>
          <div className={styles.nestedModalButtons}>
            {canDelete && (
              <button className={styles.deleteButton} type="button">
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
