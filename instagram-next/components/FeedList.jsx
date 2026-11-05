// ~/instagram-next/components/FeedList.jsx
'use client';

import { useQuery } from '@tanstack/react-query';
import styles from './FeedList.module.scss';
import stateStyles from './StatusMessage.module.scss';
import FeedItem from './FeedItem.jsx';
import FeedSkeleton from './FeedSkeleton.jsx';

async function getPosts() {
  const response = await fetch('/api/posts');

  if (!response.ok) {
    throw new Error(`게시물을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

const FeedList = () => {
  
  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isPending) {
    return (
      <div className={styles.loader}>
        <FeedSkeleton />
        <FeedSkeleton />
      </div>
    );
  }

  if (posts === undefined) {
    return (
      <p className={stateStyles.errorText}>게시물을 불러오지 못했습니다.</p>
    );
  }

  return (
    <>
      {error && (
        <p className={stateStyles.errorText}>게시물을 새로 받지 못했습니다.</p>
      )}
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
    </>
  );
};

export default FeedList;
