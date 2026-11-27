// ~/instagram-next/components/SidebarNav.jsx
"use client";

import { useUiStore } from "@/stores/useUiStore.js";
import styles from "./Sidebar.module.scss";

export default function SidebarNav({ children }) {
  // 검색 패널이나 알림 패널이 열려 있으면 사이드바를 좁힌다.
  const isPanelOpen = useUiStore((state) => state.isSearchOpen || state.isNotificationOpen);
  const closePanels = useUiStore((state) => state.closePanels);

  // 사이드바 안의 링크를 누르면 열려 있는 패널을 닫는다.
  const closeOnLink = (event) => {
    if (event.target.closest("a")) {
      closePanels();
    }
  };

  return (
    <>
      <nav
        className={`${styles.sidebar} ${isPanelOpen ? styles.collapsed : ""}`}
        onClick={closeOnLink}
      >
        {children}
      </nav>

      {isPanelOpen && <div className={styles.searchBackdrop} onClick={closePanels} />}
    </>
  );
}
