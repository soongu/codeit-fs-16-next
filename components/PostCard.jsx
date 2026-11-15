// ~/instagram-next/components/PostCard.jsx
"use client";

import { useState } from "react";
import listStyles from "./FeedList.module.scss";
import stateStyles from "./StatusMessage.module.scss";
import FeedItem from "./FeedItem.jsx";
import FeedSkeleton from "./FeedSkeleton.jsx";
import PostOptions from "./PostOptions.jsx";
import { usePost } from "@/hooks/usePost.js";
import { useMe } from "@/hooks/useMe.js";
import { ApiError } from "@/services/api.js";

// 게시물 하나를 피드 카드 한 장으로 그린다 — 카드와 그 둘레는 피드와 같은 마크업이다.
const PostCard = ({ postId }) => {
  const { data: me } = useMe();
  const { data: post, isPending, error } = usePost(postId);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  if (isPending) {
    return (
      <div className={listStyles.loader}>
        <FeedSkeleton />
      </div>
    );
  }

  if (post === undefined) {
    // 응답을 받았으면 request() 가 만든 문장(없는 번호면 «그런 게시물은 없어요»)을, 응답조차 못 받았으면 피드와 같은 문장을 보여 준다.
    const message = error instanceof ApiError ? error.message : "게시물을 불러오지 못했습니다.";
    return <p className={stateStyles.errorText}>{message}</p>;
  }

  // 이미 이 게시물의 주소다 — 상세로 가는 버튼에 할 일(onOpenDetail)을 넘기지 않는다.
  return (
    <div className={listStyles.feedList}>
      <FeedItem
        postId={post.id}
        username={post.username}
        profileImage={post.profileImage}
        imageUrls={post.imageUrls}
        postAlt={post.postAlt}
        content={post.content}
        createdAt={post.createdAt}
        likeCount={post.likeCount}
        liked={post.liked}
        commentCount={post.commentCount}
        isFirst
        viewerId={me.id}
        onOpenOptions={() => setIsOptionsOpen(true)}
      />

      {isOptionsOpen && <PostOptions post={post} onClose={() => setIsOptionsOpen(false)} />}
    </div>
  );
};

export default PostCard;
