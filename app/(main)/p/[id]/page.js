// ~/instagram-next/app/(main)/p/[id]/page.js
import page from "@/components/FeedPage.module.scss";
import PostCard from "@/components/PostCard.jsx";

export const instant = false;

export default async function PostPage({ params }) {
  const { id } = await params;

  // 주소의 번호는 글자로 온다 — 피드 카드가 쓰는 번호(숫자)와 같은 값이 되게 숫자로 바꿔 넘긴다.
  return (
    <main className={page.mainContent}>
      <PostCard postId={Number(id)} />
    </main>
  );
}
