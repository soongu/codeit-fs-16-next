// ~/instagram-next/components/PostOptions.jsx
import styles from "./CreateFeedModal.module.scss";
import { useMe } from "@/hooks/useMe.js";

// 게시물의 «…» 를 누르면 화면 위에 띄우는 메뉴 — 만들기 모달의 «삭제/취소» 확인과 같은 마크업이다.
// 내 게시물이면 «삭제»·«수정», 관리자가 보는 남의 게시물이면 «삭제» 만 보인다. 그 밖에는 «취소» 하나다.
const PostOptions = ({ post, onClose }) => {
  const { data: me } = useMe();
  const isMine = post.authorId === me.id;
  const canDelete = isMine || me.role === "ADMIN";

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
              <button className={styles.cancelButton} type="button">
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
