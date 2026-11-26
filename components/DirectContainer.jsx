// ~/instagram-next/components/DirectContainer.jsx
"use client";

import { useParams } from "next/navigation";
import styles from "./DirectPage.module.scss";

// DM 화면의 고정 상자 - 대화방을 골랐으면(주소에 번호가 있으면) hasSelection 을 붙인다.
// 좁은 화면에서는 이 클래스로 목록과 메시지 창 가운데 하나만 보인다.
export default function DirectContainer({ children }) {
  const { conversationId } = useParams();

  return <div className={`${styles.container} ${conversationId ? styles.hasSelection : ""}`}>{children}</div>;
}
