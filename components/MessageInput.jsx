// ~/instagram-next/components/MessageInput.jsx
import { useEffect, useRef, useState } from "react";
import { FaRegFaceSmile, FaMicrophone, FaImage } from "react-icons/fa6";
import styles from "./MessageInput.module.scss";
import { getSocket } from "@/services/socket.js";

// 치는 동안 3초에 한 번 «입력 중» 을 다시 알리고, 3초 동안 안 치면 멈췄다고 알린다.
// 받는 쪽은 5초 동안 새 알림이 없으면 스스로 지운다 - 3초마다 다시 알려야 치는 동안 계속 보인다.
const TYPING_STOP_DELAY_MS = 3000;
const TYPING_HEARTBEAT_MS = 3000;

// 메시지 입력 칸 - 글을 적으면 «보내기» 버튼이 나타난다. Enter 로도 보낸다.
const MessageInput = ({ onSend, conversationId }) => {
  const [value, setValue] = useState("");
  // 마지막으로 «입력 중» 을 알린 시각 - 0 이면 지금은 알리지 않은 상태다.
  const lastTypingAtRef = useRef(0);
  // 3초 동안 안 치면 «멈췄다» 를 알리는 타이머
  const stopTimerRef = useRef(null);

  const sendTyping = (typing) => {
    getSocket().emit("dm:typing", { conversationId, typing });
  };

  // 멈췄다고 알린다 - 알린 적이 없으면 보내지 않는다.
  const stopTyping = () => {
    clearTimeout(stopTimerRef.current);
    if (lastTypingAtRef.current === 0) return;
    lastTypingAtRef.current = 0;
    sendTyping(false);
  };

  // 창이 사라지면(다른 방으로 가면) 치던 중이라고 알린 것을 거둔다.
  useEffect(() => {
    return () => {
      clearTimeout(stopTimerRef.current);
      if (lastTypingAtRef.current !== 0) {
        lastTypingAtRef.current = 0;
        getSocket().emit("dm:typing", { conversationId, typing: false });
      }
    };
  }, [conversationId]);

  const handleChange = (e) => {
    const next = e.target.value;
    setValue(next);

    // 다 지웠으면 멈춘 것이다.
    if (next.length === 0) {
      stopTyping();
      return;
    }

    // 3초가 지났을 때만 다시 알린다 - 글자마다 보내지 않는다.
    const now = Date.now();
    if (now - lastTypingAtRef.current >= TYPING_HEARTBEAT_MS) {
      lastTypingAtRef.current = now;
      sendTyping(true);
    }

    // 칠 때마다 «멈췄다» 타이머를 다시 건다.
    clearTimeout(stopTimerRef.current);
    stopTimerRef.current = setTimeout(stopTyping, TYPING_STOP_DELAY_MS);
  };

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setValue("");
    // 보냈으면 더 치는 중이 아니다.
    stopTyping();
  };

  const handleKeyDown = (e) => {
    // 한글을 조합하는 중의 Enter 는 조합을 끝내는 Enter 다 - 여기서 보내면 같은 글이 두 번 간다.
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const hasText = value.trim().length > 0;

  return (
    <div className={styles.container}>
      <button type="button" className={styles.iconButton} aria-label="이모지">
        <FaRegFaceSmile size={24} />
      </button>
      <input
        type="text"
        className={styles.input}
        placeholder="메시지 입력..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {hasText ? (
        <button type="button" className={styles.sendButton} onClick={submit}>
          보내기
        </button>
      ) : (
        <>
          <button type="button" className={styles.iconButton} aria-label="음성">
            <FaMicrophone size={22} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="이미지">
            <FaImage size={22} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="스티커">
            <FaRegFaceSmile size={22} />
          </button>
        </>
      )}
    </div>
  );
};

export default MessageInput;
