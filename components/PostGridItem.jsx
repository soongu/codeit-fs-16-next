// ~/instagram-next/components/PostGridItem.jsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart, FaComment } from "react-icons/fa6";
import styles from "./PostGridItem.module.scss";

// 그리드의 칸 하나 - 누르면 게시물 하나의 주소로 간다. 사진 위에 마우스를 올리면 좋아요 수와 댓글 수가 보인다.
const PostGridItem = ({ post, isFirstRow }) => {
  const router = useRouter();

  return (
    <div className={styles.gridItem} onClick={() => router.push(`/p/${post.id}`)}>
      <Image
        src={post.thumbnailUrl}
        alt="게시물 썸네일"
        className={styles.thumbnail}
        width={300}
        height={300}
        loading={isFirstRow ? "eager" : "lazy"}
      />
      {post.multipleImages && (
        <div className={styles.multiImageBadge} aria-label="여러 장의 이미지가 포함된 게시물">
          <span className={styles.multiImageBack} />
          <span className={styles.multiImageFront} />
        </div>
      )}
      <div className={styles.overlay}>
        <span>
          <FaHeart /> {post.likeCount.toLocaleString()}
        </span>
        <span>
          <FaComment /> {post.commentCount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PostGridItem;
