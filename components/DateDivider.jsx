// ~/instagram-next/components/DateDivider.jsx
import styles from "./DateDivider.module.scss";

// 「2026년 11월 26일 오후 6:30」 같은 글자로 바꾼다.
const formatDateLabel = (date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

// 날짜가 바뀌는 곳에 넣는 줄 - 그날 첫 메시지의 시각을 보여 준다.
const DateDivider = ({ dateString }) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return <div className={styles.divider}>{formatDateLabel(date)}</div>;
};

export default DateDivider;
