// ~/instagram-next/components/NotificationButton.jsx
"use client";

import { FaRegHeart } from "react-icons/fa6";
import { useUiStore } from "@/stores/useUiStore.js";
import { useMarkSeen } from "@/hooks/useMarkSeen.js";
import NotificationBadge from "./NotificationBadge.jsx";
import styles from "./Sidebar.module.scss";

export default function NotificationButton() {
  const isOpen = useUiStore((state) => state.isNotificationOpen);
  const toggle = useUiStore((state) => state.toggleNotification);
  const { mutate: markSeen } = useMarkSeen();

  // 패널을 «열 때» 만 서버에 알린다 - 닫을 때는 새로 본 것이 없다.
  const handleClick = () => {
    if (!isOpen) {
      markSeen();
    }
    toggle();
  };

  return (
    <button type="button" className={styles.menuItem} onClick={handleClick}>
      <span className={styles.iconWrap}>
        <FaRegHeart size={24} />
        <NotificationBadge />
      </span>
      <span className={styles.menuText}>알림</span>
    </button>
  );
}
