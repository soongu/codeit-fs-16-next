// ~/instagram-next/app/(main)/error.js
'use client';

import { useEffect } from 'react';
import styles from '@/components/StatusMessage.module.scss';

export default function ErrorPage({ error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.hashtagMain}>
      <p className={styles.errorText}>
        화면을 불러오지 못했습니다. 잠시 뒤에 새로고침해주세요.
      </p>
    </main>
  );
}
