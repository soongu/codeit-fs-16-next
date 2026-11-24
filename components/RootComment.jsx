// ~/instagram-next/components/RootComment.jsx
import { useState } from "react";
import Image from "next/image";
import styles from "./PostDetailModal.module.scss";
import { timeAgo } from "../utils/timeAgo.js";
import { useReplies } from "@/hooks/useReplies.js";

// 프로필 사진이 없는 사람에게 보여 줄 사진이다. 게시물 글 줄 · 원댓글 줄 · 답글 줄이 함께 쓴다.
export const DEFAULT_PROFILE_IMAGE = "https://picsum.photos/seed/default/40/40";

// 원댓글 한 줄과 그 아래의 답글을 그린다.
// 답글을 펼쳤는지와 받은 답글은 원댓글마다 따로 있어서 원댓글 하나에 이 컴포넌트 하나를 둔다.
// Hook 은 컴포넌트 맨 위에서만 부를 수 있다. 댓글 목록의 map 안에서는 useReplies 를 부를 수 없다.
const RootComment = ({ postId, comment, canDelete, onDeleteComment, onUserClick }) => {
  // «답글 보기» 를 누르기 전에는 답글을 받지 않는다.
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useReplies(postId, comment.id, isOpen);

  // 받은 페이지들의 답글을 차례대로 이어 붙인다. 원댓글 목록과 같다.
  const replies = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className={styles.commentItem}>
      <div className={styles.postProfileImage} onClick={() => onUserClick(comment.username)} style={{ cursor: "pointer" }}>
        <Image
          src={comment.profileImage ?? DEFAULT_PROFILE_IMAGE}
          alt="Profile"
          width={36}
          height={36}
        />
      </div>
      <div className={styles.commentContent}>
        <div>
          <span className={styles.postUsername} onClick={() => onUserClick(comment.username)}>
            {comment.username}
          </span>
          <span className={styles.postCaption}>{comment.content}</span>
        </div>
        <div className={styles.commentTimeAndReply}>
          <div className={styles.postTime}>{timeAgo(comment.createdAt)}</div>
          {comment.likeCount > 0 && (
            <div className={styles.commentLikes}>좋아요 {comment.likeCount.toLocaleString()}개</div>
          )}
          {canDelete(comment) && (
            <button type="button" className={styles.replyButton} onClick={() => onDeleteComment(comment)}>
              삭제
            </button>
          )}
        </div>

        {replies.map((reply) => (
          <div key={reply.id} className={styles.commentItem} style={{ marginTop: "12px", marginBottom: "12px" }}>
            <div className={styles.postProfileImage} onClick={() => onUserClick(reply.username)} style={{ cursor: "pointer" }}>
              <Image
                src={reply.profileImage ?? DEFAULT_PROFILE_IMAGE}
                alt="Profile"
                width={36}
                height={36}
              />
            </div>
            <div className={styles.commentContent}>
              <div>
                <span className={styles.postUsername} onClick={() => onUserClick(reply.username)}>
                  {reply.username}
                </span>
                <span className={styles.postCaption}>{reply.content}</span>
              </div>
              <div className={styles.commentTimeAndReply}>
                <div className={styles.postTime}>{timeAgo(reply.createdAt)}</div>
                {reply.likeCount > 0 && (
                  <div className={styles.commentLikes}>좋아요 {reply.likeCount.toLocaleString()}개</div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* 답글이 있고 아직 펼치지 않았으면 «답글 보기» 를 보인다. 누르면 그때 첫 페이지를 받는다. */}
        {comment.replyCount > 0 && !isOpen && (
          <div className={styles.viewRepliesContainer}>
            <div className={styles.replyLine} />
            <button className={styles.viewRepliesButton} onClick={() => setIsOpen(true)}>
              답글 보기({comment.replyCount}개)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RootComment;
