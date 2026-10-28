// ~/instagram-next/app/[username]/saved/page.js
import styles from '@/components/StatusMessage.module.scss';
import { profiles } from '@/data/profiles.js';
import { notFound } from 'next/navigation';

export const instant = false;

export default async function SavedPage({ params }) {
  const { username } = await params;
  const profile = profiles.find((item) => item.username === username);

  if (profile === undefined) {
    notFound();
  }

  return (
    <main className={styles.hashtagMain}>
      <p className={styles.emptyHint}>
        {profile.username} 님이 저장한 게시물이 아직 없어요.
      </p>
    </main>
  );
}
