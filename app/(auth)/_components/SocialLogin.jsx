// ~/instagram-next/app/(auth)/_components/SocialLogin.jsx
"use client";

import { useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import styles from "./LoginPage.module.scss";

// 제공자마다 다른 것은 아이콘과 글자뿐이다 — 시작 주소는 제공자 이름으로 만든다.
const PROVIDERS = {
  google: { icon: <FaGoogle />, label: "Google로 로그인" },
  kakao: { icon: <RiKakaoTalkFill />, label: "카카오로 로그인" },
  naver: { icon: <SiNaver />, label: "네이버로 로그인" },
};

export default function SocialLogin({ provider }) {
  const { icon, label } = PROVIDERS[provider];
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  // 로그인한 뒤 돌아갈 곳(?next=)을 시작 주소에 그대로 실어 보낸다 — 그 주소로 보낼지는 서버가 정한다.
  const start = `/api/v2/auth/${provider}`;
  const href = next === null ? start : `${start}?${new URLSearchParams({ next })}`;

  // 소셜 로그인은 요청이 아니라 이동이다 — 화면 전체가 제공자에게 갔다가 돌아온다. 그래서 Link 가 아니라 a 로 그린다.
  return (
    <a href={href} className={styles.facebookLogin}>
      {icon}
      {label}
    </a>
  );
}
