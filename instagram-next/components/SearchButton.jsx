// ~/instagram-next/components/SearchButton.jsx
'use client';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useUiStore } from '@/stores/useUiStore.js';
import styles from './Sidebar.module.scss';

export default function SearchButton() {
  console.log('[render] SearchButton');
  const toggle = useUiStore((state) => state.toggleSearch);

  return (
    <button
      type='button'
      className={styles.menuItem}
      onClick={toggle}>
      <FaMagnifyingGlass size={24} />
      <span className={styles.menuText}>검색</span>
    </button>
  );
}
