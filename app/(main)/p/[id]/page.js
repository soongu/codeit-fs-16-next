// ~/instagram-next/app/(main)/p/[id]/page.js
import page from "@/components/FeedPage.module.scss";

export const instant = false;

export default async function PostPage({ params }) {
  const { id } = await params;

  return (
    <main className={page.mainContent}>
      <p>{id}번 게시물</p>
    </main>
  );
}
