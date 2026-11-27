// ~/instagram-next/app/(main)/direct/t/[conversationId]/page.js
import { Suspense } from "react";
import styles from "@/components/DirectPage.module.scss";
import MessagePane from "@/components/MessagePane.jsx";

export const instant = false;

async function PaneContent({ params }) {
  const { conversationId } = await params;

  // 주소의 번호는 글자로 온다 - 목록이 쓰는 대화방 번호(숫자)와 같은 값이 되게 숫자로 바꿔 넘긴다.
  return <MessagePane conversationId={Number(conversationId)} />;
}

// 고른 대화방의 메시지 창 - 주소의 번호를 읽는 부분은 Suspense 안에 둔다.
export default function ConversationPage({ params }) {
  return (
    <div className={styles.pane}>
      <Suspense fallback={null}>
        <PaneContent params={params} />
      </Suspense>
    </div>
  );
}
