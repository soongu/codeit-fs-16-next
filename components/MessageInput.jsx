// ~/instagram-next/components/MessageInput.jsx
import { useState } from "react";
import { FaRegFaceSmile, FaMicrophone, FaImage } from "react-icons/fa6";
import styles from "./MessageInput.module.scss";

// 메시지 입력 칸 - 글을 적으면 «보내기» 버튼이 나타난다. Enter 로도 보낸다.
const MessageInput = ({ onSend }) => {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setValue("");
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
        onChange={(e) => setValue(e.target.value)}
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
