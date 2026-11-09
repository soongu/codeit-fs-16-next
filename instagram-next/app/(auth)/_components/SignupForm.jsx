// ~/instagram-next/app/(auth)/_components/SignupForm.jsx
'use client';

import { useState } from 'react';
import styles from './SignupPage.module.scss';

// 입력칸 하나 — 칸마다 같은 마크업을 되풀이하지 않으려고 컴포넌트로 뗐다.
function SignupField({ type, name, placeholder, value, onChange }) {
  return (
    <div className={styles.formField}>
      <div className={styles.inputContainer}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default function SignupForm() {
  const [form, setForm] = useState({
    emailOrPhone: '',
    name: '',
    username: '',
    password: '',
  });

  // 어느 칸이 바뀌었는지는 그 칸의 name 속성으로 안다.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form
      className={styles.authForm}
      noValidate>
      <SignupField
        type='email'
        name='emailOrPhone'
        placeholder='휴대폰 번호 또는 이메일 주소'
        value={form.emailOrPhone}
        onChange={handleChange}
      />
      <SignupField
        type='text'
        name='name'
        placeholder='성명'
        value={form.name}
        onChange={handleChange}
      />
      <SignupField
        type='text'
        name='username'
        placeholder='사용자 이름'
        value={form.username}
        onChange={handleChange}
      />
      <SignupField
        type='password'
        name='password'
        placeholder='비밀번호'
        value={form.password}
        onChange={handleChange}
      />

      <p className={styles.privacyText}>
        저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에
        업로드했을 수도 있습니다.
        <a href='#'>더 알아보기</a>
      </p>

      <button
        type='submit'
        className={styles.authButton}
        disabled>
        가입
      </button>
    </form>
  );
}
