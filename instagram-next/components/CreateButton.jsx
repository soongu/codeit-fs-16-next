// ~/instagram-next/components/CreateButton.jsx
'use client';

import { FaRegSquarePlus } from 'react-icons/fa6';
import { useOpenCreateFeedModal } from './CreateFeedModalContext.jsx';
import styles from './Sidebar.module.scss';

export default function CreateButton() {
  const open = useOpenCreateFeedModal();

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
