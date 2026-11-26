// ~/instagram-next/components/MessagePane.jsx
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { FaPhone, FaVideo, FaCircleInfo, FaChevronLeft } from "react-icons/fa6";
import MessageBubble from "./MessageBubble.jsx";
import DateDivider from "./DateDivider.jsx";
import MessageInput from "./MessageInput.jsx";
import styles from "./MessagePane.module.scss";
import { useConversation } from "@/hooks/useConversation.js";
import { useMessages } from "@/hooks/useMessages.js";
import { useMe } from "@/hooks/useMe.js";
import { getSocket } from "@/services/socket.js";
import { useUiStore } from "@/stores/useUiStore.js";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/profileImage.js";

// 두 시각이 같은 날인가 - 이 컴퓨터의 시간대로 본다.
const isSameDay = (a, b) => {
  if (!a || !b) return false;
  const da = new Date(a);
  const db = new Date(b);
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate();
};

// 같은 사람이 같은 날 잇달아 보낸 말풍선 묶음에서 이 말풍선의 자리 - single · first · middle · last
const computePosition = (messages, index) => {
  const cur = messages[index];
  const prev = messages[index - 1];
  const next = messages[index + 1];

  const sameAsPrev = prev && prev.senderId === cur.senderId && isSameDay(prev.createdAt, cur.createdAt);
  const sameAsNext = next && next.senderId === cur.senderId && isSameDay(next.createdAt, cur.createdAt);

  if (!sameAsPrev && !sameAsNext) return "single";
  if (!sameAsPrev && sameAsNext) return "first";
  if (sameAsPrev && sameAsNext) return "middle";
  return "last";
};

// DM 화면 오른쪽의 메시지 창 - 머리에 그 방의 상대를 보여 준다.
const MessagePane = ({ conversationId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const showToast = useUiStore((state) => state.showToast);
  // 상대가 누구인지는 왼쪽 목록에서 찾지 않고 이 방의 정보를 따로 받는다.
  const { data: conversation } = useConversation(conversationId);
  const { data: me } = useMe();
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useMessages(conversationId);
  const scrollRef = useRef(null);
  const topSentinelRef = useRef(null);
  // 처음 받은 메시지를 그린 뒤 한 번만 맨 아래로 내린다 - 내렸는지를 기억해 둔다.
  const hasScrolledToBottomRef = useRef(false);
  // 앞 메시지를 받기 직전의 스크롤 상자 높이와 위치 - 위에 붙인 뒤 보던 메시지로 돌아가는 데 쓴다.
  const beforePrependRef = useRef(null);

  // 화면에 그려지기 «전에» 스크롤 위치를 맞춘다 - 맨 위가 한 번 보였다가 내려가지 않게.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el === null || isPending) return;

    // 앞 메시지를 위에 붙였으면, 늘어난 높이만큼 내려 보던 메시지가 제자리에 있게 한다.
    const before = beforePrependRef.current;
    if (before !== null) {
      el.scrollTop = el.scrollHeight - before.scrollHeight + before.scrollTop;
      beforePrependRef.current = null;
      return;
    }

    if (hasScrolledToBottomRef.current) return;

    // scrollHeight 는 내용 전체의 높이다. scrollTop 을 그만큼 주면 갈 수 있는 맨 아래까지 내려간다.
    el.scrollTop = el.scrollHeight;
    hasScrolledToBottomRef.current = true;
  }, [isPending, conversation, data]);

  // 다른 방에 다녀오면 이 창은 지워지지 않고 숨었다가 다시 보인다. 숨어 있는 동안 스크롤 위치가 0 으로 돌아가니,
  // 숨을 때 «내렸다» 를 지워 두면 다시 보일 때 위의 effect 가 다시 맨 아래로 내린다.
  useLayoutEffect(() => {
    return () => {
      hasScrolledToBottomRef.current = false;
    };
  }, []);

  // 맨 위 감지용 요소가 스크롤 상자 안에서 보이면 그 앞 메시지 20개를 받는다.
  // 목록과 달리 root 를 스크롤 상자로 준다 - 창 전체가 아니라 이 상자 안에서 보이는지를 본다.
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const target = topSentinelRef.current;
    const root = scrollRef.current;
    if (target === null || root === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // 받기 직전의 높이와 위치를 기억해 둔다.
          beforePrependRef.current = { scrollHeight: root.scrollHeight, scrollTop: root.scrollTop };
          fetchNextPage();
        }
      },
      { root },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, conversation]);

  // 메시지 보내기 - 실시간 연결로 dm:send 를 보내고, 결과(ack)가 오면 그 메시지를 창의 맨 아래에 붙인다.
  const handleSend = (text) => {
    getSocket().emit("dm:send", { conversationId, content: text }, (result) => {
      if (result.error) {
        showToast(result.error.message, "error");
        return;
      }

      const message = result.data;

      // 이력 캐시의 첫 페이지(가장 최근 메시지들)의 맨 앞에 넣는다 - 서버가 주는 차례(최신 먼저)와 같게.
      queryClient.setQueryData(["messages", conversationId], (old) => {
        if (!old) return old;
        const [first, ...rest] = old.pages;
        return { ...old, pages: [{ ...first, items: [message, ...first.items] }, ...rest] };
      });

      // 내가 보냈으니 맨 아래로 내린다 - «내렸다» 를 지우면 위의 effect 가 다시 내린다.
      hasScrolledToBottomRef.current = false;

      // 목록은 서버가 정한 차례(마지막 메시지 시각)대로 다시 받는다 - 이 방이 맨 위로 온다.
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    });
  };

  if (!conversation) return null;

  // 서버는 최신 메시지부터 준다(페이지 안에서도, 페이지끼리도). 화면은 아래가 최신이라 뒤집어서 그린다.
  // reverse() 는 배열 자체를 바꾸지만, flatMap 이 새로 만든 배열이라 캐시의 페이지는 그대로다.
  const messages = (data?.pages.flatMap((page) => page.items) ?? []).reverse();

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

      <div className={styles.scroll} ref={scrollRef}>
        {hasNextPage && <div ref={topSentinelRef} className={styles.topSentinel} />}

        {isFetchingNextPage && (
          <div className={styles.loadingOlder}>
            <div className={styles.spinner} />
          </div>
        )}

        {isPending ? (
          <div className={styles.loadingInitial}>
            <div className={styles.spinner} />
          </div>
        ) : messages.length === 0 ? (
          <div className={styles.empty}>아직 메시지가 없습니다. 대화를 시작해 보세요!</div>
        ) : (
          messages.map((m, idx) => {
            const isMine = m.senderId === me?.id;
            const prev = messages[idx - 1];
            // 앞 메시지와 날짜가 다르면(또는 맨 위 메시지면) 날짜 줄을 먼저 넣는다.
            const showDate = !prev || !isSameDay(prev.createdAt, m.createdAt);
            const position = computePosition(messages, idx);
            // 상대 사진은 묶음의 마지막 말풍선 옆에만 둔다.
            const showAvatar = !isMine && position !== "first" && position !== "middle";

            return (
              <div key={m.id}>
                {showDate && <DateDivider dateString={m.createdAt} />}
                <MessageBubble
                  message={m}
                  isMine={isMine}
                  showAvatar={showAvatar}
                  avatarUrl={otherUser.profileImage}
                  position={position}
                />
              </div>
            );
          })
        )}
      </div>

      <MessageInput onSend={handleSend} />
    </section>
  );
};

export default MessagePane;
