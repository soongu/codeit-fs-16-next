// ~/instagram-next/components/NotificationPanel.jsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegComment, FaUserPlus, FaAt } from "react-icons/fa6";
import { useUiStore } from "@/stores/useUiStore.js";
import { useNotifications } from "@/hooks/useNotifications.js";
import { timeAgo } from "@/utils/timeAgo.js";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/profileImage.js";
import styles from "./NotificationPanel.module.scss";

// 알림 종류마다 프로필 사진 오른쪽 아래에 붙는 작은 아이콘.
const TYPE_BADGE = {
  LIKE: { icon: FaHeart, className: "badgeLike" },
  COMMENT: { icon: FaRegComment, className: "badgeComment" },
  FOLLOW: { icon: FaUserPlus, className: "badgeFollow" },
  MENTION: { icon: FaAt, className: "badgeMention" },
};

const TypeBadge = ({ type }) => {
  const def = TYPE_BADGE[type];
  if (!def) return null;
  const Icon = def.icon;
  return (
    <span className={`${styles.typeBadge} ${styles[def.className]}`} aria-hidden>
      <Icon size={10} />
    </span>
  );
};

export default function NotificationPanel() {
  const isOpen = useUiStore((state) => state.isNotificationOpen);
  const close = useUiStore((state) => state.closeNotification);
  const router = useRouter();
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useNotifications(isOpen);
  const sentinelRef = useRef(null);

  // 목록 맨 아래 감지용 요소가 보이면 다음 20개를 받는다 - 팔로워 목록과 같은 방법이다.
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    const target = sentinelRef.current;
    if (target === null) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const notifications = data?.pages.flatMap((page) => page.items) ?? [];

  // 알림을 누르면 패널을 닫고 그 알림이 가리키는 곳으로 간다 - 팔로우는 그 사람의 프로필, 나머지는 그 게시물.
  const handleNotificationClick = (notification) => {
    close();
    router.push(notification.type === "FOLLOW" ? `/${notification.sender.username}` : `/p/${notification.postId}`);
  };

  return (
    <div className={`${styles.notificationPanel} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <h2>알림</h2>
      </div>

      <hr className={styles.divider} />

      <div className={styles.content}>
        {isPending ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeletonItem}>
              <div className={styles.skeletonAvatar} />
              <div className={styles.skeletonTextGroup}>
                <div className={styles.skeletonMessage} />
                <div className={styles.skeletonTime} />
              </div>
            </div>
          ))
        ) : notifications.length > 0 ? (
          <>
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`${styles.notificationItem} ${!n.isRead ? styles.unread : ""}`}
                onClick={() => handleNotificationClick(n)}
              >
                <div className={styles.notificationAvatar}>
                  {/* 프로필 사진이 없는 사람은 기본 이미지를 보여 준다. */}
                  <Image src={n.sender.profileImage ?? DEFAULT_PROFILE_IMAGE} alt={n.sender.username} width={44} height={44} />
                  <TypeBadge type={n.type} />
                </div>
                <div className={styles.notificationBody}>
                  <p className={styles.notificationMessage}>{n.message}</p>
                  <span className={styles.notificationTime}>{timeAgo(n.createdAt)}</span>
                </div>
                {n.thumbnailUrl ? (
                  <div className={styles.notificationThumbnail}>
                    <Image src={n.thumbnailUrl} alt="게시물" width={44} height={44} />
                  </div>
                ) : !n.isRead ? (
                  <div className={styles.unreadDot} />
                ) : null}
              </div>
            ))}
            {hasNextPage && <div ref={sentinelRef} className={styles.sentinel} />}
            {isFetchingNextPage && (
              <div className={styles.loadingMore}>
                <div className={styles.spinner} />
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>알림이 없습니다</div>
        )}
      </div>
    </div>
  );
}
