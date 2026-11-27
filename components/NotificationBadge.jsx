// ~/instagram-next/components/NotificationBadge.jsx
"use client";

import styles from "./Sidebar.module.scss";
import { useUnseenNotifications } from "@/hooks/useUnseenNotifications.js";

// 사이드바 «알림» 아이콘 위의 빨간 점 - 알림 패널을 마지막으로 연 뒤에 온 알림이 하나라도 있으면 그린다.
export default function NotificationBadge() {
  const { data } = useUnseenNotifications();

  if (!data || data.unseenCount === 0) return null;

  return <span className={styles.badgeDot} aria-label="새 알림" />;
}
