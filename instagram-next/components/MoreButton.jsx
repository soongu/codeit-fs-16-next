// ~/instagram-next/components/MoreButton.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaBars } from 'react-icons/fa6';
import styles from './Sidebar.module.scss';
import { authApi } from '@/services/api.js';

// 사이드바 맨 아래 «더 보기» — 누르면 메뉴가 열리고, 메뉴에서 로그아웃한다.
export default function MoreButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  // 메뉴 밖을 누르면 닫는다.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(`.${styles.moreMenu}`) &&
        !event.target.closest('#moreButton')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const { mutate: logout } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // 서버가 세션을 지웠으면 화면이 받아 둔 것도 모두 버린다 — «나는 누구»도, 게시물 목록도.
      queryClient.clear();
      router.replace('/login');
    },
  });

  return (
    <div style={{ position: 'relative' }}>
      <button
        type='button'
        id='moreButton'
        className={styles.menuItem}
        onClick={() => setIsOpen(!isOpen)}>
        <FaBars size={24} />
        <span className={styles.menuText}>더 보기</span>
      </button>

      {isOpen && (
        <div className={styles.moreMenu}>
          <button
            className={styles.menuItem}
            onClick={() => {
              // 이 메뉴도 숨겨진 채 남는다 — 닫고 나서 로그아웃한다.
              setIsOpen(false);
              logout();
            }}>
            <span>로그아웃</span>
          </button>
        </div>
      )}
    </div>
  );
}
