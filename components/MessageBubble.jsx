// ~/instagram-next/components/MessageBubble.jsx
import Image from "next/image";
import styles from "./MessageBubble.module.scss";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/profileImage.js";

// 말풍선 하나 - 내 메시지는 오른쪽, 상대 메시지는 왼쪽이다.
// position 은 같은 사람이 잇달아 보낸 말풍선 묶음에서 이 말풍선의 자리(single · first · middle · last)다.
const MessageBubble = ({ message, isMine, showAvatar, avatarUrl, position }) => {
  const positionClass = styles[`pos-${position}`] || "";

  return (
    <div className={`${styles.row} ${isMine ? styles.mine : styles.other}`}>
      {!isMine && (
        <div className={styles.avatarSlot}>
          {showAvatar && (
            <Image src={avatarUrl ?? DEFAULT_PROFILE_IMAGE} alt="" width={28} height={28} className={styles.avatar} />
          )}
        </div>
      )}
      <div className={`${styles.bubble} ${isMine ? styles.bubbleMine : styles.bubbleOther} ${positionClass}`}>
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
