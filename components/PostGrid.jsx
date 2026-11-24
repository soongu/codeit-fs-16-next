// ~/instagram-next/components/PostGrid.jsx
import styles from "./PostGrid.module.scss";
import PostGridItem from "./PostGridItem.jsx";

const PostGrid = ({ posts }) => {
  if (posts.length === 0) {
    return <p className={styles.noPosts}>게시물이 없습니다.</p>;
  }

  return (
    <div className={styles.postGrid}>
      {posts.map((post, index) => (
        // 첫 줄의 세 칸은 화면 맨 위 사진이라 바로 받는다.
        <PostGridItem key={post.id} post={post} isFirstRow={index < 3} />
      ))}
    </div>
  );
};

export default PostGrid;
