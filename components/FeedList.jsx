// ~/instagram-next/components/FeedList.jsx
import styles from "./FeedList.module.scss";
import FeedItem from "./FeedItem.jsx";
import { getPosts } from "@/data/posts.js";

const FeedList = async () => {
  "use cache";

  const posts = await getPosts();

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
