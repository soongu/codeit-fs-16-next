// ~/instagram-next/components/FeedItem.jsx
import styles from "./FeedItem.module.scss";
import Carousel from "./Carousel.jsx";
import FeedItemHeader from "./FeedItemHeader.jsx";
import FeedItemActions from "./FeedItemActions.jsx";
import FeedItemContent from "./FeedItemContent.jsx";
import FeedItemComments from "./FeedItemComments.jsx";
import CommentForm from "./CommentForm.jsx";
import CommentArea from "./CommentArea.jsx";
import { useLikePost } from "@/hooks/useLikePost.js";

const FeedItem = ({
  postId,
  username,
  profileImage,
  imageUrls,
  postAlt,
  content,
  createdAt,
  likeCount,
  liked,
  commentCount,
  isFirst,
  viewerId,
  onOpenDetail,
  onOpenOptions,
}) => {
  const { mutate, isPending } = useLikePost(viewerId);
  const toggleLike = () => mutate({ postId, liked: !liked });

  // 사진을 두 번 누르는 것은 «누르기» 만 한다 — 이미 눌렀거나 보내는 중이면 보내지 않는다.
  const likeByDoubleClick = () => {
    if (liked || isPending) return;
    mutate({ postId, liked: true });
  };

  return (
    <article className={styles.post}>
      <FeedItemHeader
        postId={postId}
        username={username}
        profileImage={profileImage}
        onOpenOptions={onOpenOptions}
      />

      <div className={styles.imageContainer}>
        <Carousel
          imageUrls={imageUrls}
          alt={postAlt}
          isFirst={isFirst}
          onImageDoubleClick={likeByDoubleClick}
        />
      </div>

      <FeedItemActions
        likeCount={likeCount}
        liked={liked}
        isPending={isPending}
        onToggleLike={toggleLike}
        onOpenDetail={onOpenDetail}
      />

      <div className={styles.content}>
        <FeedItemContent
          username={username}
          content={content}
          createdAt={createdAt}
        />
      </div>

      <CommentArea>
        <FeedItemComments commentCount={commentCount} onOpenDetail={onOpenDetail} />
        <CommentForm postId={postId} viewerId={viewerId} />
      </CommentArea>
    </article>
  );
};

export default FeedItem;
