// ~/instagram-next/components/HashtagPosts.jsx
"use client";

import styles from "./StatusMessage.module.scss";
import profile from "./ProfilePage.module.scss";
import PostGrid from "./PostGrid.jsx";
import { useHashtagPosts } from "@/hooks/useHashtagPosts.js";

const HashtagPosts = ({ name }) => {
  const { data, isPending, error } = useHashtagPosts(name);

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
          <PostGrid posts={data.pages.flatMap((page) => page.items)} />
        )}
      </section>
    </main>
  );
};

export default HashtagPosts;
