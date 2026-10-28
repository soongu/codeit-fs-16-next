// ~/instagram-next/components/FeedListClient.jsx
'use client';

import { useEffect, useState } from 'react';
import styles from './FeedList.module.scss';
import FeedItem from './FeedItem.jsx';

export default function FeedListClient() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    loadPosts();
  }, []);

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
}
