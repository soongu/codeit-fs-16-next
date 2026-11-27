// ~/instagram-next/components/FeedList.jsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./FeedList.module.scss";
import stateStyles from "./StatusMessage.module.scss";
import FeedItem from "./FeedItem.jsx";
import FeedSkeleton from "./FeedSkeleton.jsx";
import { postApi } from "@/services/api.js";
import { useMe } from "@/hooks/useMe.js";

const PER_PAGE = 2;

function getPostPage(pageParam) {
  const params = { limit: PER_PAGE };

  // 첫 페이지에는 커서가 없다 — null 을 그대로 넣으면 주소에 cursor=null 이라는 글자가 실린다.
  if (pageParam !== null) {
    params.cursor = pageParam;
  }

  return postApi.getPage(params);
}

const FeedList = () => {
  const router = useRouter();
  const { data: me } = useMe();
  const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      // 누가 보느냐에 따라 liked 가 달라진다 — 서버는 로그인 정보로 정하고, 화면은 보는 사람의 번호를 키에 넣는다.
      queryKey: ["posts", me?.id],
      queryFn: ({ pageParam }) => getPostPage(pageParam),
      // 누가 보는지 알기 전에는 보내지 않는다.
      enabled: me !== undefined,
      initialPageParam: null,
      // 서버가 준 커서를 그대로 돌려준다 — 끝이면 null 이 와서 다음 페이지가 없다.
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const target = loaderRef.current;
    if (target === null) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div className={styles.loader}>
        <FeedSkeleton />
        <FeedSkeleton />
      </div>
    );
  }

  if (data === undefined) {
    return <p className={stateStyles.errorText}>게시물을 불러오지 못했습니다.</p>;
  }

  const posts = data.pages.flatMap((page) => page.items);

  return (
    <>
      {error && <p className={stateStyles.errorText}>게시물을 새로 받지 못했습니다.</p>}
      <div className={styles.feedList}>
        {posts.map((post, index) => (
          <FeedItem
            key={post.id}
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
            isFirst={index === 0}
            viewerId={me.id}
            // 말풍선 버튼과 «댓글 N개 보기» 는 게시물 하나의 주소로 간다.
            onOpenDetail={() => router.push(`/p/${post.id}`)}
          />
        ))}
      </div>
      <div ref={loaderRef} className={styles.loader}>
        {isFetchingNextPage && (
          <>
            <FeedSkeleton />
            <FeedSkeleton />
          </>
        )}
      </div>
    </>
  );
};

export default FeedList;
