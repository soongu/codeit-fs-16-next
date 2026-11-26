// ~/instagram-next/app/(main)/direct/layout.js
import styles from "@/components/DirectPage.module.scss";

// DM 화면의 틀 - 왼쪽은 대화방 목록, 오른쪽은 주소에 따라 바뀌는 페이지다.
export default function DirectLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.list}></div>
      {children}
    </div>
  );
}
