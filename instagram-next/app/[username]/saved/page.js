// ~/instagram-next/app/[username]/saved/page.js
import styles from '@/components/StatusMessage.module.scss';
import { profiles } from '@/data/profiles.js';

export const instant = false;

export default async function SavedPage({ params }) {
  const { username } = await params;
  const profile = profiles.find((item) => item.username === username);

  if (profile === undefined) {
    return <p className={styles.errorText}>{username} 님의 프로필이 없어요.</p>;
  }

  return (
    <main className={styles.hashtagMain}>
      <p className={styles.emptyHint}>
        {profile.username} 님이 저장한 게시물이 아직 없어요.
      </p>
    </main>
  );
}
