// ~/instagram-next/app/(main)/p/[id]/page.js
import { Suspense } from "react";
import page from "@/components/FeedPage.module.scss";
import PostCard from "@/components/PostCard.jsx";

export const instant = false;

async function PostContent({ params }) {
  const { id } = await params;

  // 주소의 번호는 글자로 온다 — 피드 카드가 쓰는 번호(숫자)와 같은 값이 되게 숫자로 바꿔 넘긴다.
  return <PostCard postId={Number(id)} />;
}

// @modal 슬롯이 생긴 뒤로는 이 페이지도 슬롯과 함께 그려진다 — 주소의 번호를 읽는 부분은 Suspense 안에 둔다.
export default function PostPage({ params }) {
  return (
    <main className={page.mainContent}>
      <Suspense fallback={null}>
        <PostContent params={params} />
      </Suspense>
    </main>
  );
}
