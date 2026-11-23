// ~/instagram-next/components/PostComments.jsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./PostDetailModal.module.scss";
import { timeAgo } from "../utils/timeAgo.js";
import { useComments } from "@/hooks/useComments.js";

// 프로필 사진이 없는 사람에게 보여 줄 사진 — 게시물 글 줄과 댓글 줄이 함께 쓴다.
const DEFAULT_PROFILE_IMAGE = "https://picsum.photos/seed/default/40/40";

// 맨 위에 게시물 글 한 줄, 그 아래에 댓글 목록을 그린다.
// authorId 는 게시물을 쓴 사람이고 viewerId 는 지금 보는 사람이다. 둘을 보고 줄마다 «삭제» 를 보일지 정한다.
// «삭제» 를 누르면 onDeleteComment 에 그 댓글을 넘긴다. 정말 지울지는 부르는 쪽이 묻는다.
const PostComments = ({
  postId,
  authorId,
  viewerId,
  username,
  profileImage = DEFAULT_PROFILE_IMAGE,
  content,
  createdAt,
  onDeleteComment,
}) => {
  const router = useRouter();
  const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useComments(postId);

  // 받은 페이지들의 댓글을 차례대로 이어 붙인다 — 피드가 게시물을 이어 붙이는 것과 같다.
  const comments = data?.pages.flatMap((page) => page.items) ?? [];

  // 내 댓글이거나 내 게시물에 달린 댓글이면 지울 수 있다. 서버도 같은 규칙으로 확인한다.
  const canDelete = (comment) => comment.authorId === viewerId || authorId === viewerId;

  // 사진이나 사용자 이름을 누르면 그 사람의 프로필로 간다.
  const handleUserClick = (name) => router.push(`/${name}`);

  return (
    <div className={styles.commentsContainer}>
      {/* 원본 게시글 */}
      <div className={styles.commentItem}>
        <div className={styles.postProfileImage} onClick={() => handleUserClick(username)} style={{ cursor: "pointer" }}>
          <Image
            src={profileImage}
            alt="Profile"
            width={36}
            height={36}
          />
        </div>
        <div className={styles.commentContent}>
          <div>
            <span className={styles.postUsername} onClick={() => handleUserClick(username)}>
              {username}
            </span>
            <span className={styles.postCaption}>{content}</span>
          </div>
          <div className={styles.postTime}>{timeAgo(createdAt)}</div>
        </div>
      </div>

      {/* 댓글 리스트 */}
      <div>
        {/* 받는 중이면 스켈레톤 · 받지 못했으면 그 에러의 문장 · 받았는데 없으면 «댓글이 없습니다.» · 있으면 댓글 줄 */}
        {isPending ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.skeletonItem}>
              <div className={styles.skeletonAvatar} />
              <div className={styles.skeletonContent}>
                <div className={`${styles.skeletonText} ${styles.skeletonTextShort}`} />
                <div className={`${styles.skeletonText} ${styles.skeletonTextLong}`} />
              </div>
            </div>
          ))
        ) : data === undefined ? (
          <div className={styles.noCommentsContainer}>
            <p className={styles.noComments}>{error.message}</p>
          </div>
        ) : comments.length === 0 ? (
          <div className={styles.noCommentsContainer}>
            <p className={styles.noComments}>댓글이 없습니다.</p>
            <p className={styles.noCommentsAdditional}>첫 번째 댓글을 남겨보세요!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.postProfileImage} onClick={() => handleUserClick(comment.username)} style={{ cursor: "pointer" }}>
                <Image
                  src={comment.profileImage ?? DEFAULT_PROFILE_IMAGE}
                  alt="Profile"
                  width={36}
                  height={36}
                />
              </div>
              <div className={styles.commentContent}>
                <div>
                  <span className={styles.postUsername} onClick={() => handleUserClick(comment.username)}>
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
              </div>
            </div>
          ))
        )}

        {/* 다음 페이지가 있으면 + 버튼 — 받는 동안은 눌러도 다시 보내지 않는다. */}
        {hasNextPage && (
          <div className={styles.loadMoreContainer}>
            <button type="button" className={styles.loadMoreButton} onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              <svg aria-label="댓글 더 보기" fill="currentColor" height="28" role="img" viewBox="0 0 24 24" width="28">
                <circle cx="12" cy="12" fill="none" r="11" stroke="currentColor" strokeWidth="2"></circle>
                <path d="M12 6v12M6 12h12" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostComments;
