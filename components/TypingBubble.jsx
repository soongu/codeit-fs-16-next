// ~/instagram-next/components/TypingBubble.jsx
import Image from "next/image";
import styles from "./TypingBubble.module.scss";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/profileImage.js";

// 상대가 입력 중일 때 창 맨 아래에 뜨는 점 세 개 말풍선
const TypingBubble = ({ avatarUrl }) => (
  <div className={styles.row}>
    <div className={styles.avatarSlot}>
      <Image src={avatarUrl ?? DEFAULT_PROFILE_IMAGE} alt="" width={28} height={28} className={styles.avatar} />
    </div>
    <div className={styles.bubble} aria-label="입력 중">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  </div>
);

export default TypingBubble;
