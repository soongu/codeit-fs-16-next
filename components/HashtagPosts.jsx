// ~/instagram-next/components/HashtagPosts.jsx
"use client";

import { useEffect, useRef } from "react";
import styles from "./StatusMessage.module.scss";
import profile from "./ProfilePage.module.scss";
import PostGrid from "./PostGrid.jsx";
import { useHashtagPosts } from "@/hooks/useHashtagPosts.js";

const HashtagPosts = ({ name }) => {
  const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useHashtagPosts(name);
  const loadMoreRef = useRef(null);

  // 맨 아래 감지용 요소가 화면에 들어오면 다음 12개를 받는다 - 피드와 같은 방법이다.
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

  return (
    // 바깥 상자는 프로필 화면의 것을 쓴다 - 사이드바만큼 띄우고 그리드와 같은 폭(935px)이다.
    <main className={profile.profileMain}>
      <header className={styles.hashtagHeader}>
        <h1 className={styles.hashtagTitle}>#{name}</h1>
      </header>

      <section className={styles.hashtagFeed}>
        {isPending ? (
          <p className={styles.loadingText}>로딩 중...</p>
        ) : data === undefined && error.status === 404 ? (
          <p className={styles.errorText}>해당 해시태그를 찾을 수 없습니다.</p>
        ) : data === undefined ? (
          <p className={styles.errorText}>게시물을 불러오지 못했습니다.</p>
        ) : (
          <>
            <PostGrid posts={data.pages.flatMap((page) => page.items)} />
            {hasNextPage ? <div ref={loadMoreRef} className={styles.sentinel} aria-hidden /> : null}
            {isFetchingNextPage ? <p className={styles.loadingText}>더 불러오는 중...</p> : null}
          </>
        )}
      </section>
    </main>
  );
};

export default HashtagPosts;
