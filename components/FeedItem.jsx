// ~/instagram-next/components/FeedItem.jsx
import styles from "./FeedItem.module.scss";
import Carousel from "./Carousel.jsx";
import FeedItemHeader from "./FeedItemHeader.jsx";
import FeedItemActions from "./FeedItemActions.jsx";
import FeedItemContent from "./FeedItemContent.jsx";
import FeedItemComments from "./FeedItemComments.jsx";
import CommentForm from "./CommentForm.jsx";
import CommentArea from "./CommentArea.jsx";

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
}) => {
  return (
    <article className={styles.post}>
      <FeedItemHeader
        postId={postId}
        username={username}
        profileImage={profileImage}
      />

      <div className={styles.imageContainer}>
        <Carousel imageUrls={imageUrls} alt={postAlt} isFirst={isFirst} />
      </div>

      <FeedItemActions postId={postId} likeCount={likeCount} liked={liked} />

      <div className={styles.content}>
        <FeedItemContent
          username={username}
          content={content}
          createdAt={createdAt}
        />
      </div>

      <CommentArea>
        <FeedItemComments commentCount={commentCount} />
        <CommentForm postId={postId} />
      </CommentArea>
    </article>
  );
};

export default FeedItem;
