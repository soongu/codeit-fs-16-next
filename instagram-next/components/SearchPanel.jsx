// ~/instagram-next/components/SearchPanel.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { FaTimes } from 'react-icons/fa';
import { useUiStore } from '@/stores/useUiStore.js';
import styles from './SearchPanel.module.scss';

async function searchMembers(keyword) {
  const response = await fetch(`/api/members/search?keyword=${keyword}`);

  if (!response.ok) {
    throw new Error(`사람을 찾지 못했어요 (${response.status})`);
  }

  return response.json();
}

export default function SearchPanel() {
  const isOpen = useUiStore((state) => state.isSearchOpen);
  const close = useUiStore((state) => state.closeSearch);
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const { data, isPending, error } = useQuery({
    queryKey: ['members', keyword],
    queryFn: () => searchMembers(keyword),
    enabled: keyword !== '',
  });

  const goToProfile = (username) => {
    close();
    router.push(`/${username}`);
  };

  let result;

  if (keyword === '') {
    result = null;
  } else if (isPending) {
    result = Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className={styles.skeletonItem}>
        <div className={styles.skeletonAvatar} />
        <div>
          <div className={styles.skeletonUsername} />
          <div className={styles.skeletonName} />
        </div>
      </div>
    ));
  } else if (error) {
    result = <div className={styles.emptyState}>{error.message}</div>;
  } else if (data.length === 0) {
    result = <div className={styles.emptyState}>검색 결과 없음</div>;
  } else {
    result = data.map((member) => (
      <div
        key={member.username}
        className={styles.resultItem}
        onClick={() => goToProfile(member.username)}>
        <div className={styles.resultAvatar}>
          <Image
            src={member.profileImage}
            alt={member.username}
            width={44}
            height={44}
          />
        </div>
        <div className={styles.resultInfo}>
          <span className={styles.resultUsername}>{member.username}</span>
          <span className={styles.resultName}>{member.name}</span>
        </div>
      </div>
    ));
  }

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
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        {keyword && (
          <button
            type='button'
            className={styles.clearButton}
            onClick={() => setKeyword('')}>
            <FaTimes size={8} />
          </button>
        )}
      </div>

      <hr className={styles.divider} />

      <div className={styles.content}>{result}</div>
    </div>
  );
}
