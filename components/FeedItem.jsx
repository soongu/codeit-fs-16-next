// ~/instagram-next/components/FeedItem.jsx
import { useRouter } from "next/navigation";
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
}) => {
  const router = useRouter();
  const { mutate, isPending } = useLikePost(viewerId);
  const toggleLike = () => mutate({ postId, liked: !liked });

  // 말풍선 버튼과 «댓글 N개 보기» 는 게시물 하나의 주소로 간다.
  const openDetail = () => router.push(`/p/${postId}`);

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
        onOpenDetail={openDetail}
      />

      <div className={styles.content}>
        <FeedItemContent
          username={username}
          content={content}
          createdAt={createdAt}
        />
      </div>

      <CommentArea>
        <FeedItemComments commentCount={commentCount} onOpenDetail={openDetail} />
        <CommentForm postId={postId} />
      </CommentArea>
    </article>
  );
};

export default FeedItem;
