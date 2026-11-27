// ~/instagram-next/components/NotificationButton.jsx
"use client";

import { FaRegHeart } from "react-icons/fa6";
import { useUiStore } from "@/stores/useUiStore.js";
import styles from "./Sidebar.module.scss";

export default function NotificationButton() {
  const toggle = useUiStore((state) => state.toggleNotification);

  return (
    <button type="button" className={styles.menuItem} onClick={toggle}>
      <span className={styles.iconWrap}>
        <FaRegHeart size={24} />
      </span>
      <span className={styles.menuText}>알림</span>
    </button>
  );
}
