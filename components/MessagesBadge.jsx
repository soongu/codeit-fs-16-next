// ~/instagram-next/components/MessagesBadge.jsx
"use client";

import styles from "./Sidebar.module.scss";
import { useUnreadConversations } from "@/hooks/useUnreadConversations.js";

// 사이드바 «메시지» 아이콘 위의 빨간 점 - 안 읽은 메시지가 있는 방이 하나라도 있으면 그린다.
export default function MessagesBadge() {
  const { data } = useUnreadConversations();

  if (!data || data.conversationCount === 0) return null;

  return <span className={styles.badgeDot} aria-label="안읽음" />;
}
