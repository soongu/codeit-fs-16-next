// ~/instagram-react/src/components/FeedItem.jsx
import styles from './FeedItem.module.scss';
import carousel from './Carousel.module.scss';
import FeedItemHeader from './FeedItemHeader.jsx';
import FeedItemActions from './FeedItemActions.jsx';
import FeedItemContent from './FeedItemContent.jsx';
import FeedItemComments from './FeedItemComments.jsx';
import CommentForm from './CommentForm.jsx';
import CommentArea from './CommentArea.jsx';
import Image from 'next/image';

const FeedItem = ({
  postId,
  username,
  profileImage,
  postImage,
  postAlt,
  content,
  createdAt,
  likeCount,
  liked,
  commentCount,
  isFirst
}) => {
  return (
    <article className={styles.post}>
      <FeedItemHeader
        postId={postId}
        username={username}
        profileImage={profileImage}
      />

      <div className={styles.imageContainer}>
        <div className={carousel.carouselSlide}>
          <Image
            src={postImage}
            alt={postAlt}
            width={600}
            height={600}
            loading={isFirst ? 'eager' : 'lazy'}
          />
        </div>
      </div>

      <FeedItemActions
        postId={postId}
        likeCount={likeCount}
        liked={liked}
      />

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
