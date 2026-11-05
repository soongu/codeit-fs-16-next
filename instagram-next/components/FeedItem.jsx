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
import Carousel from './Carousel.jsx';
import { useLikePost } from '@/hooks/useLikePost.js';

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
  const { mutate, isPending } = useLikePost();

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
};;

export default FeedItem;
