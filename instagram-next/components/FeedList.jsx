// ~/instagram-next/components/FeedList.jsx
import { connection } from 'next/server';
import styles from './FeedList.module.scss';
import FeedItem from './FeedItem.jsx';
import { getPosts } from '@/data/posts.js';

const FeedList = async () => {

  await connection();
  const posts = await getPosts();

  // throw new Error('게시물 목록을 받아 오지 못했어요');

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
          liked={post.liked}
          commentCount={post.commentCount}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};

export default FeedList;
