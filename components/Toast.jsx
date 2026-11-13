// ~/instagram-next/components/Toast.jsx
import { useEffect } from "react";
import styles from "./Toast.module.scss";

// 화면 위쪽에 잠깐 떴다가 사라지는 알림 — 보이기 시작하고 duration 밀리초가 지나면 onClose 를 부른다.
// variant 가 "error" 면 빨간 바탕으로 그린다.
export default function Toast({ message, isVisible, onClose, duration = 3000, variant = "default" }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const contentClass = variant === "error" ? `${styles.toastContent} ${styles.toastContentError}` : styles.toastContent;

  return (
    <div className={styles.toastContainer}>
      <div className={contentClass}>{message}</div>
    </div>
  );
}
