// ~/instagram-next/app/jaehoon/saved/page.js
import styles from '@/components/StatusMessage.module.scss';
import { profile } from '../profile.js';

export default function SavedPage() {
  return (
    <main className={styles.hashtagMain}>
      <p className={styles.emptyHint}>
        {profile.username} 님이 저장한 게시물이 아직 없어요.
      </p>
    </main>
  );
}
