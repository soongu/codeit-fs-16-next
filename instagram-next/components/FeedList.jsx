// ~/instagram-next/components/FeedList.jsx
'use client';

import { useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styles from './FeedList.module.scss';
import stateStyles from './StatusMessage.module.scss';
import FeedItem from './FeedItem.jsx';
import FeedSkeleton from './FeedSkeleton.jsx';

import { MY_USER_ID } from '@/utils/me.js';

const PER_PAGE = 2;

async function getPostPage({ pageParam }) {
  const condition = pageParam
    ? `limit=${PER_PAGE}&cursor=${pageParam}`
    : `limit=${PER_PAGE}`;
  const response = await fetch(`/api/posts?userId=${MY_USER_ID}&${condition}`);

  if (!response.ok) {
    throw new Error(`게시물을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

const FeedList = () => {

  console.log('[render] FeedList');

  const {
    data,
    isPending,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPostPage,
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.items[lastPage.items.length - 1].id : null,

    // 1. 탭 이동시 무분별한 재요청 차단
    staleTime: 10 * 60 * 1000, // 10분간 fresh 유지
    refetchOnWindowFocus: false, // 창 포커스 이동시 자동 refetch 비활성화

    maxPages: 5, // 아무리 많이 스크롤해도 메모리에는 5페이지까지만 저장해
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
    return (
      <p className={stateStyles.errorText}>게시물을 불러오지 못했습니다.</p>
    );
  }

  const posts = data.pages.flatMap((page) => page.items);
  

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
            imageUrls={post.imageUrls}
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

      <div
        ref={loaderRef}
        className={styles.loader}>
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
1;
