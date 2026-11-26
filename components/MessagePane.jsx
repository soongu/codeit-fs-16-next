// ~/instagram-next/components/MessagePane.jsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPhone, FaVideo, FaCircleInfo, FaChevronLeft } from "react-icons/fa6";
import styles from "./MessagePane.module.scss";
import { useConversation } from "@/hooks/useConversation.js";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/profileImage.js";

// DM 화면 오른쪽의 메시지 창 - 머리에 그 방의 상대를 보여 준다.
const MessagePane = ({ conversationId }) => {
  const router = useRouter();
  // 상대가 누구인지는 왼쪽 목록에서 찾지 않고 이 방의 정보를 따로 받는다.
  const { data: conversation } = useConversation(conversationId);

  if (!conversation) return null;

  const { otherUser } = conversation;

  return (
    <section className={styles.pane}>
      <header className={styles.header}>
        <div className={styles.headerUser}>
          {/* 좁은 화면에서만 보이는 버튼 - 목록으로 돌아간다. */}
          <button
            type="button"
            className={styles.backButton}
            onClick={() => router.push("/direct/inbox")}
            aria-label="대화방 목록으로"
          >
            <FaChevronLeft size={20} />
          </button>
          <Image
            src={otherUser.profileImage ?? DEFAULT_PROFILE_IMAGE}
            alt={otherUser.username}
            width={44}
            height={44}
            className={styles.headerAvatar}
            loading="eager"
          />
          <div className={styles.headerText}>
            <div className={styles.headerName}>{otherUser.name ?? otherUser.username}</div>
            <div className={styles.headerUsername}>{otherUser.username}</div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.headerIcon} aria-label="음성 통화">
            <FaPhone size={22} />
          </button>
          <button type="button" className={styles.headerIcon} aria-label="영상 통화">
            <FaVideo size={22} />
          </button>
          <button type="button" className={styles.headerIcon} aria-label="정보">
            <FaCircleInfo size={22} />
          </button>
        </div>
      </header>

      <div className={styles.scroll}></div>
    </section>
  );
};

export default MessagePane;
