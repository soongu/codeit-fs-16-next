// ~/instagram-next/components/ConversationItem.jsx
import Image from "next/image";
import styles from "./ConversationItem.module.scss";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/profileImage.js";
import { timeAgo } from "@/utils/timeAgo.js";

// 대화방 목록의 한 줄 - 상대의 사진과 이름, 마지막 메시지와 그 시각
const ConversationItem = ({ conversation }) => {
  const { otherUser, lastMessage, lastMessageAt } = conversation;

  // 메시지가 하나도 없는 방은 lastMessage 가 null 이다.
  const previewText = lastMessage?.content ?? "";
  const timeText = timeAgo(lastMessageAt);

  return (
    <button type="button" className={styles.item}>
      <div className={styles.avatar}>
        {/* 목록은 화면 맨 위에 보이는 사진이라 미루지 않고 바로 받는다. */}
        <Image
          src={otherUser.profileImage ?? DEFAULT_PROFILE_IMAGE}
          alt={otherUser.username}
          width={56}
          height={56}
          loading="eager"
        />
      </div>
      <div className={styles.body}>
        <span className={styles.username}>{otherUser.username}</span>
        <span className={styles.preview}>
          {previewText && <span className={styles.previewText}>{previewText}</span>}
          {previewText && timeText && <span className={styles.dot}>·</span>}
          {timeText && <span className={styles.time}>{timeText}</span>}
        </span>
      </div>
    </button>
  );
};

export default ConversationItem;
