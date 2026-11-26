// ~/instagram-next/app/(main)/direct/inbox/page.js
import { FaRegPaperPlane } from "react-icons/fa6";
import styles from "@/components/DirectPage.module.scss";

// 아직 대화방을 고르지 않았을 때 오른쪽에 보이는 화면
export default function InboxPage() {
  return (
    <main className={`${styles.main} ${styles.pane}`}>
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <FaRegPaperPlane size={48} />
        </div>
        <h2 className={styles.emptyTitle}>내 메시지</h2>
        <p className={styles.emptyHint}>친구에게 메시지를 보내보세요.</p>
      </div>
    </main>
  );
}
