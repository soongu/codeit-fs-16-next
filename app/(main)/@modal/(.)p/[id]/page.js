// ~/instagram-next/app/(main)/@modal/(.)p/[id]/page.js
import { Suspense } from "react";
import PostDetailModal from "@/components/PostDetailModal.jsx";

export const instant = false;

async function ModalContent({ params }) {
  const { id } = await params;

  return <PostDetailModal postId={Number(id)} />;
}

// 피드에서 /p/9 로 갈 때 Next.js 가 이 페이지로 가로챈다 — 피드는 그대로 두고 그 위에 모달을 띄운다.
// 이 페이지는 피드 페이지와 함께 그려진다 — 주소의 번호를 읽는 부분은 Suspense 안에 둔다.
export default function PostModalPage({ params }) {
  return (
    <Suspense fallback={null}>
      <ModalContent params={params} />
    </Suspense>
  );
}
