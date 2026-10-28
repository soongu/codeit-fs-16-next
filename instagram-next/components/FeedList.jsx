// ~/instagram-next/components/FeedList.jsx
import { connection } from 'next/server';
import styles from './FeedList.module.scss';
import FeedItem from './FeedItem.jsx';
import { posts } from '@/data/posts.js';

const FeedList = async () => {
  await connection();

  return (
    <div className={styles.feedList}>
      {posts.map((post, index) => (
        <FeedItem
          key={post.id}
          postId={post.id}
          username={post.username}
          profileImage={post.profileImage}
          postImage={post.postImage}
          postAlt={post.postAlt}
          content={post.content}
          createdAt={post.createdAt}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};

export default FeedList;
