// ~/instagram-next/components/ProfileLink.jsx
'use client';

import Image from 'next/image';
import NavLink from './NavLink.jsx';
import styles from './Sidebar.module.scss';
import { useMe } from '@/hooks/useMe.js';

// 사이드바의 «프로필» — 로그인한 사람의 프로필로 간다.
export default function ProfileLink() {
  const { data: me } = useMe();

  return (
    <NavLink
      href={me ? `/${me.username}` : '/'}
      className={styles.menuItem}>
      <div className={styles.profileImage}>
        <Image
          // 프로필 사진이 없는 사람은 기본 이미지를 보여 준다.
          src={me?.profileImage ?? '/default-profile.svg'}
          alt='프로필'
          width={40}
          height={40}
        />
      </div>
      <span className={styles.menuText}>프로필</span>
    </NavLink>
  );
}
