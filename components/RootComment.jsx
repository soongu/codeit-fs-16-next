// ~/instagram-next/components/RootComment.jsx
import { useState } from "react";
import Image from "next/image";
import styles from "./PostDetailModal.module.scss";
import { timeAgo } from "../utils/timeAgo.js";
import { useReplies } from "@/hooks/useReplies.js";
import ReplyForm from "./ReplyForm.jsx";
import MentionText from "./MentionText.jsx";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/profileImage.js";

// 원댓글 한 줄과 그 아래의 답글을 그린다.
// 답글을 펼쳤는지와 받은 답글은 원댓글마다 따로 있어서 원댓글 하나에 이 컴포넌트 하나를 둔다.
// Hook 은 컴포넌트 맨 위에서만 부를 수 있다. 댓글 목록의 map 안에서는 useReplies 를 부를 수 없다.
// replyUsername 은 이 원댓글 아래에 연 답글 입력창의 «@이름» 이다. 입력창을 열지 않았으면 null 이다.
const RootComment = ({
  postId,
  viewerId,
  comment,
  replyUsername,
  canDelete,
  onDeleteComment,
  onStartReply,
  onReplied,
  onUserClick,
}) => {
  // «답글 보기» 를 누르기 전에는 답글을 받지 않는다.
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useReplies(postId, comment.id, isOpen);

  // 받은 페이지들의 답글을 차례대로 이어 붙인다. 원댓글 목록과 같다.
  const replies = data?.pages.flatMap((page) => page.items) ?? [];

  // 아직 받지 않은 답글 수다. 원댓글 줄의 replyCount 에서 받은 만큼 뺀다.
  const remaining = comment.replyCount - replies.length;

  // 첫 페이지를 받는 중이거나 다음 페이지를 받는 중이다.
  const isFetchingReplies = isLoading || isFetchingNextPage;

  // 펼치기 전이거나 다음 페이지가 남았으면 더 받을 수 있다. 첫 페이지를 받지 못했을 때도 다시 누를 수 있게 둔다.
  const canFetchMore = !isOpen || data === undefined || hasNextPage;

  // 처음 누르면 펼치기만 한다. 펼치면 useReplies 가 첫 페이지를 받는다. 그다음부터는 다음 페이지를 받는다.
  const showMoreReplies = () => (isOpen ? fetchNextPage() : setIsOpen(true));

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
          <span className={styles.postCaption}><MentionText text={comment.content} /></span>
        </div>
        <div className={styles.commentTimeAndReply}>
          <div className={styles.postTime}>{timeAgo(comment.createdAt)}</div>
          {comment.likeCount > 0 && (
            <div className={styles.commentLikes}>좋아요 {comment.likeCount.toLocaleString()}개</div>
          )}
          <button
            type="button"
            className={styles.replyButton}
            onClick={() => onStartReply(comment, comment.id)}
          >
            답글 달기
          </button>
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
                <span className={styles.postCaption}><MentionText text={reply.content} /></span>
              </div>
              <div className={styles.commentTimeAndReply}>
                <div className={styles.postTime}>{timeAgo(reply.createdAt)}</div>
                {reply.likeCount > 0 && (
                  <div className={styles.commentLikes}>좋아요 {reply.likeCount.toLocaleString()}개</div>
                )}
                {/* 답글에 다는 답글도 이 원댓글에 단다. 입력창만 그 답글을 쓴 사람의 이름으로 채운다. */}
                <button
                  type="button"
                  className={styles.replyButton}
                  onClick={() => onStartReply(reply, comment.id)}
                >
                  답글 달기
                </button>
                {/* 답글을 지울 때는 어느 원댓글의 답글인지(parentId)를 함께 넘긴다. 지운 뒤 고칠 캐시가 원댓글과 다르다. */}
                {canDelete(reply) && (
                  <button type="button" className={styles.replyButton} onClick={() => onDeleteComment({ ...reply, parentId: comment.id })}>
                    삭제
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* 남은 답글이 있으면 «답글 보기(남은 수)» 를 보인다. 받는 동안은 버튼 대신 스피너다. 다 받으면 사라진다. */}
        {remaining > 0 && (isFetchingReplies || canFetchMore) && (
          <div className={styles.viewRepliesContainer}>
            <div className={styles.replyLine} />
            {isFetchingReplies ? (
              <div className={styles.replySpinner} />
            ) : (
              <button className={styles.viewRepliesButton} onClick={showMoreReplies}>
                답글 보기({remaining}개)
              </button>
            )}
          </div>
        )}

        {/* 이 원댓글에 답글 입력창을 열었으면 그린다. 누른 줄의 이름이 바뀌면 key 가 바뀌어 입력창을 새로 채운다. */}
        {replyUsername !== null && (
          <ReplyForm
            key={replyUsername}
            postId={postId}
            rootId={comment.id}
            rootUsername={comment.username}
            targetUsername={replyUsername}
            viewerId={viewerId}
            onReplied={onReplied}
          />
        )}
      </div>
    </div>
  );
};

export default RootComment;
