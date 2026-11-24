// ~/instagram-next/app/(main)/explore/search/keyword/page.js
import { Suspense } from "react";
import styles from "@/components/StatusMessage.module.scss";
import profile from "@/components/ProfilePage.module.scss";
import HashtagPosts from "@/components/HashtagPosts.jsx";

// 주소의 ?q=%23노을 에서 해시태그 이름을 꺼낸다 - 앞의 # 을 뗀다.
// q 가 없거나(주소를 직접 친 경우) 같은 이름이 두 번 와서 배열이면 이름이 없는 것으로 본다.
async function HashtagContent({ searchParams }) {
  const { q } = await searchParams;
  const name = typeof q === "string" ? q.replace(/^#/, "") : "";

  if (name === "") {
    return (
      <main className={profile.profileMain}>
        <p className={styles.emptyHint}>검색할 해시태그가 없습니다. URL에 ?q=#태그명 형식으로 접근해 주세요.</p>
      </main>
    );
  }

  return <HashtagPosts name={name} />;
}

// 주소의 쿼리를 읽는 부분은 Suspense 안에 둔다 - 상세 페이지가 주소의 번호를 읽을 때와 같다.
export default function HashtagPage({ searchParams }) {
  return (
    <Suspense fallback={null}>
      <HashtagContent searchParams={searchParams} />
    </Suspense>
  );
}
