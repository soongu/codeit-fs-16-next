// ~/instagram-next/components/SearchPanel.jsx
'use client';

import { useUiStore } from '@/stores/useUiStore.js';
import styles from './SearchPanel.module.scss';

export default function SearchPanel() {
  console.log('[render] SearchPanel');
  const isOpen = useUiStore((state) => state.isSearchOpen);

  return (
    <div className={`${styles.searchPanel} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <h2>검색</h2>
      </div>

      <div className={styles.searchInputContainer}>
        <input
          type='text'
          className={styles.searchInput}
          placeholder='검색'
        />
      </div>

      <hr className={styles.divider} />

      <div className={styles.content}></div>
    </div>
  );
}
