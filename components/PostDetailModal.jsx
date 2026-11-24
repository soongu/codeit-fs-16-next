// ~/instagram-next/components/PostDetailModal.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import styles from "./PostDetailModal.module.scss";
import Carousel from "./Carousel.jsx";
import PostHeader from "./PostHeader.jsx";
import PostComments from "./PostComments.jsx";
import PostActions from "./PostActions.jsx";
import CommentForm from "./CommentForm.jsx";
import PostOptions from "./PostOptions.jsx";
import DeleteConfirm from "./DeleteConfirm.jsx";
import { ApiError } from "@/services/api.js";
import { usePost } from "@/hooks/usePost.js";
import { useMe } from "@/hooks/useMe.js";
import { useLikePost } from "@/hooks/useLikePost.js";
import { useDeleteComment } from "@/hooks/useDeleteComment.js";
import { useUiStore } from "@/stores/useUiStore.js";

// 피드 위에 띄우는 게시물 하나 — 데이터는 페이지(PostCard)와 같은 usePost 로 받는다.
const PostDetailModal = ({ postId }) => {
  const router = useRouter();
  const { data: me } = useMe();
  const { data: post, error } = usePost(postId);
  const { mutate, isPending } = useLikePost(me?.id);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  // 지울지 묻고 있는 댓글이다. 묻고 있지 않으면 null 이다.
  const [commentToDelete, setCommentToDelete] = useState(null);
  const { mutate: deleteComment, isPending: isDeletingComment } = useDeleteComment(me?.id);
  const showToast = useUiStore((state) => state.showToast);

  // 다른 탭에서 지운 게시물이면 다시 받을 때 404 가 온다 — 앞에 받아 둔 게시물이 남아 있어도 그리지 않는다.
  const isDeleted = error instanceof ApiError && error.status === 404;

  // 받기 전이나 지운 게시물이면 아무것도 그리지 않는다.
  if (post === undefined || isDeleted) return null;

  // ✕ 나 바깥을 누르면 한 칸 뒤로 간다 — 모달을 연 주소(피드)로 돌아가면서 모달이 닫힌다.
  const closeModal = () => router.back();

  const toggleLike = () => mutate({ postId: post.id, liked: !post.liked });

  // 지우기 확인에서 «삭제» 를 누르면 부른다. 지웠으면 확인을 닫는다. 실패하면 알림을 띄우고 확인은 그대로 둔다.
  const handleDeleteComment = () => {
    deleteComment(
      { postId: post.id, commentId: commentToDelete.id, parentId: commentToDelete.parentId },
      {
        onSuccess: () => setCommentToDelete(null),
        onError: (error) => {
          showToast(error instanceof ApiError ? error.message : "댓글을 삭제하지 못했어요. 다시 시도해 주세요.", "error");
        },
      },
    );
  };

  // 사진을 두 번 누르는 것은 «누르기» 만 한다 — 피드 카드와 같다.
  const likeByDoubleClick = () => {
    if (post.liked || isPending) return;
    mutate({ postId: post.id, liked: true });
  };

  // 메뉴는 모달 상자 «바깥» 에 그린다 — 안에 두면 모달의 ✕ 버튼이 메뉴의 어두운 바탕보다 위에 보인다.
  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalBackdrop} onClick={closeModal}></div>
        <button className={styles.closeButton} onClick={closeModal}>
          <FaTimes />
        </button>

        <div className={styles.modalContent}>
          <div className={styles.modalCarouselContainer}>
            <Carousel
              imageUrls={post.imageUrls}
              alt={post.postAlt}
              isFirst
              onImageDoubleClick={likeByDoubleClick}
            />
          </div>

          <div className={styles.modalSidebar}>
            <PostHeader
              username={post.username}
              profileImage={post.profileImage}
              onOpenOptions={() => setIsOptionsOpen(true)}
            />
            <PostComments
              postId={post.id}
              authorId={post.authorId}
              viewerId={me?.id}
              username={post.username}
              profileImage={post.profileImage}
              content={post.content}
              createdAt={post.createdAt}
              onDeleteComment={setCommentToDelete}
            />
            <PostActions
              likeCount={post.likeCount}
              liked={post.liked}
              isPending={isPending}
              onToggleLike={toggleLike}
            />
            {/* 댓글 입력창 */}
            <div className={styles.comment}>
              <CommentForm postId={post.id} viewerId={me?.id} />
            </div>
          </div>
        </div>
      </div>

      {/* 지우면 모달을 닫는다 — 한 칸 뒤(피드)로 가면 뒤의 피드에서는 이미 그 카드가 빠져 있다. */}
      {isOptionsOpen && (
        <PostOptions post={post} onClose={() => setIsOptionsOpen(false)} onDeleted={closeModal} />
      )}

      {/* 댓글 지우기 확인도 메뉴처럼 모달 상자 바깥에 그린다. */}
      {commentToDelete && (
        <DeleteConfirm
          title="댓글을 삭제하시겠어요?"
          message="삭제한 댓글은 되돌릴 수 없습니다."
          isDeleting={isDeletingComment}
          onConfirm={handleDeleteComment}
          onCancel={() => setCommentToDelete(null)}
        />
      )}
    </>
  );
};

export default PostDetailModal;
