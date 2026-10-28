// ~/instagram-next/app/(main)/[username]/loading.js
import styles from '@/components/StatusMessage.module.scss';

export default function Loading() {
  return <p className={styles.loadingText}>불러오는 중이에요…</p>;
}
