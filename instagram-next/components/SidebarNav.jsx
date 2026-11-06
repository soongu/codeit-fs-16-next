// ~/instagram-next/components/SidebarNav.jsx
'use client';

import { useUiStore } from '@/stores/useUiStore.js';
import styles from './Sidebar.module.scss';

export default function SidebarNav({ children }) {
  console.log('[render] SidebarNav');
  const isSearchOpen = useUiStore((state) => state.isSearchOpen);
  const closeSearch = useUiStore((state) => state.closeSearch);

  // 사이드바 안의 링크를 누르면 검색 패널을 닫는다.
  const closeOnLink = (event) => {
    if (event.target.closest('a')) {
      closeSearch();
    }
  };

  return (
    <>
      <nav
        className={`${styles.sidebar} ${isSearchOpen ? styles.collapsed : ''}`}
        onClick={closeOnLink}>
        {children}
      </nav>

      {isSearchOpen && (
        <div
          className={styles.searchBackdrop}
          onClick={closeSearch}
        />
      )}
    </>
  );
}
