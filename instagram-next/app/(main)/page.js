// ~/instagram-next/app/(main)/page.js
import { Suspense } from 'react';
import page from '@/components/FeedPage.module.scss';
import styles from '@/components/FeedList.module.scss';
import FeedList from '@/components/FeedList.jsx';
import FeedSkeleton from '@/components/FeedSkeleton.jsx';

// throw new Error('게시물 목록을 받아 오지 못했어요');

export default function Home() {
  return (
    <main className={page.mainContent}>
      <Suspense
        fallback={
          <div className={styles.loader}>
            <FeedSkeleton />
            <FeedSkeleton />
          </div>
        }>
        <FeedList />
      </Suspense>
    </main>
  );
}
