// ~/instagram-next/components/CreateButton.jsx
'use client';

import { FaRegSquarePlus } from 'react-icons/fa6';
import { useUiStore } from '@/stores/useUiStore.js';
import styles from './Sidebar.module.scss';

export default function CreateButton() {

  console.log('[render] CreateButton');

  const open = useUiStore((state) => state.openCreateFeed);

  return (
    <button
      type='button'
      className={styles.menuItem}
      onClick={open}>
      <FaRegSquarePlus size={24} />
      <span className={styles.menuText}>만들기</span>
    </button>
  );
}
