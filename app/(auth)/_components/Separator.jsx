// ~/instagram-next/app/(auth)/_components/Separator.jsx
import styles from "./Separator.module.scss";

export default function Separator() {
  return (
    <div className={styles.separator}>
      <div className={styles.line} />
      <div className={styles.text}>또는</div>
      <div className={styles.line} />
    </div>
  );
}
