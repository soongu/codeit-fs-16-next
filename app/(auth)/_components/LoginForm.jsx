// ~/instagram-next/app/(auth)/_components/LoginForm.jsx
"use client";

import { useState } from "react";
import styles from "./LoginPage.module.scss";

export default function LoginForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    // 가입 화면처럼, 브라우저가 폼을 주소에 실어 보내는 기본 동작부터 막는다.
    event.preventDefault();
  };

  // 두 칸이 모두 차야 누를 수 있다 — 로그인 화면은 규칙을 검사하지 않는다.
  const isDisabled = !form.username || !form.password;

  return (
    <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formField}>
        <input
          type="text"
          name="username"
          placeholder="전화번호, 사용자 이름 또는 이메일"
          required
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formField}>
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          required
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={styles.authButton} disabled={isDisabled}>
        로그인
      </button>
    </form>
  );
}
