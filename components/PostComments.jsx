// ~/instagram-next/components/PostComments.jsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./PostDetailModal.module.scss";
import { timeAgo } from "../utils/timeAgo.js";

// 댓글 목록 맨 위의 게시물 글 — 댓글은 아직 없어서 글 한 줄만 그린다.
const PostComments = ({
  username,
  profileImage = "https://picsum.photos/seed/default/40/40",
  content,
  createdAt,
}) => {
  const router = useRouter();

  // 사진이나 사용자 이름을 누르면 그 사람의 프로필로 간다.
  const handleUserClick = () => router.push(`/${username}`);

  return (
    <div className={styles.commentsContainer}>
      {/* 원본 게시글 */}
      <div className={styles.commentItem}>
        <div className={styles.postProfileImage} onClick={handleUserClick} style={{ cursor: "pointer" }}>
          <Image
            src={profileImage}
            alt="Profile"
            width={36}
            height={36}
          />
        </div>
        <div className={styles.commentContent}>
          <div>
            <span className={styles.postUsername} onClick={handleUserClick}>
              {username}
            </span>
            <span className={styles.postCaption}>{content}</span>
          </div>
          <div className={styles.postTime}>{timeAgo(createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
