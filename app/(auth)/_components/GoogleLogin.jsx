// ~/instagram-next/app/(auth)/_components/GoogleLogin.jsx
"use client";

import { useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import styles from "./LoginPage.module.scss";

export default function GoogleLogin() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  // 로그인한 뒤 돌아갈 곳(?next=)을 시작 주소에 그대로 실어 보낸다 — 그 주소로 보낼지는 서버가 정한다.
  const href = next === null ? "/api/v2/auth/google" : `/api/v2/auth/google?${new URLSearchParams({ next })}`;

  // 구글 로그인은 요청이 아니라 이동이다 — 화면 전체가 구글에 갔다가 돌아온다. 그래서 Link 가 아니라 a 로 그린다.
  return (
    <a href={href} className={styles.facebookLogin}>
      <FaGoogle />
      Google로 로그인
    </a>
  );
}
