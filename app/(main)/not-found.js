// ~/instagram-next/app/(main)/not-found.js
import styles from "@/components/StatusMessage.module.scss";

export default function NotFound() {
  return (
    <main className={styles.hashtagMain}>
      <p className={styles.emptyHint}>이런 주소는 없어요.</p>
    </main>
  );
}
