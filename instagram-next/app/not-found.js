// ~/instagram-next/app/not-found.js
import Sidebar from '@/components/Sidebar.jsx';
import styles from '@/components/StatusMessage.module.scss';

export default function NotFound() {
  return (
    <>
      <Sidebar />
      <main className={styles.hashtagMain}>
        <p className={styles.emptyHint}>이런 주소는 없어요.</p>
      </main>
    </>
  );
}
