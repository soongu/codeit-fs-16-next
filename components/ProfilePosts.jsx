// ~/instagram-next/components/ProfilePosts.jsx
"use client";

import { useEffect, useRef } from "react";
import styles from "./ProfileFeed.module.scss";
import status from "./StatusMessage.module.scss";
import PostGrid from "./PostGrid.jsx";
import { useProfilePosts } from "@/hooks/useProfilePosts.js";

// 프로필 아래의 그리드 - 그 사람이 올린 게시물을 12개씩 받고, 끝까지 내리면 다음 12개를 받는다.
const ProfilePosts = ({ username }) => {
  const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProfilePosts(username);
  const loadMoreRef = useRef(null);

  // 맨 아래 감지용 요소가 화면에 들어오면 다음 12개를 받는다 - 해시태그 페이지와 같은 방법이다.
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const target = loadMoreRef.current;
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

  // 그런 사람이 없으면 헤더가 이미 «이런 주소는 없어요.» 를 보여 준다 - 그리드는 그리지 않는다.
  if (error?.status === 404) {
    return null;
  }

  return (
    <div className={styles.profileFeed}>
      {isPending ? (
        <p className={styles.loadingText}>로딩 중...</p>
      ) : data === undefined ? (
        <p className={status.errorText}>게시물을 불러오지 못했습니다.</p>
      ) : (
        <>
          <PostGrid posts={data.pages.flatMap((page) => page.items)} />
          {hasNextPage ? <div ref={loadMoreRef} className={status.sentinel} aria-hidden /> : null}
          {isFetchingNextPage ? <p className={styles.loadingText}>더 불러오는 중...</p> : null}
        </>
      )}
    </div>
  );
};

export default ProfilePosts;
