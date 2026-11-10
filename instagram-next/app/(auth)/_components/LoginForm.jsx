// ~/instagram-next/app/(auth)/_components/LoginForm.jsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import styles from './LoginPage.module.scss';
import { authApi, ApiError } from '@/services/api.js';

// 실패했을 때 보여 줄 문장은 화면이 고른다.
function errorText(error) {
  // 서버의 답을 받지 못했다 — fetch 가 던진 TypeError 다.
  if (!(error instanceof ApiError)) {
    return "서버에 연결하지 못했어요. 인터넷 연결을 확인해 주세요.";
  }

  // 서버가 «그런 사용자는 없다» 고 답했으면 그 문장을 그대로 보여 준다.
  if (error.status === 401) {
    return error.message;
  }

  return "로그인하지 못했어요. 잠시 뒤에 다시 시도해 주세요.";
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    // 가입하고 넘어왔으면 주소의 ?username= 으로 첫 값을 채운다.
    username: searchParams.get('username') ?? '',
    password: '',
  });

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: authApi.login,
    // 로그인이 끝나면 피드로 간다.
    onSuccess: () => router.push('/'),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    // 다시 치기 시작하면 앞에서 실패한 문장을 지운다.
    reset();
  };

  const handleSubmit = (event) => {
    // 가입 화면처럼, 브라우저가 폼을 주소에 실어 보내는 기본 동작부터 막는다.
    event.preventDefault();
    mutate(form);
  };

  // 두 칸이 모두 차야 누를 수 있다 — 로그인 화면은 규칙을 검사하지 않는다.
  const isDisabled = !form.username || !form.password || isPending;

  return (
    <form
      className={styles.authForm}
      onSubmit={handleSubmit}
      noValidate>
      <div className={styles.formField}>
        <input
          type='text'
          name='username'
          placeholder='전화번호, 사용자 이름 또는 이메일'
          required
          value={form.username}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>
      <div className={styles.formField}>
        <input
          type='password'
          name='password'
          placeholder='비밀번호'
          required
          value={form.password}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>

      {error && <div className={styles.errorMessage}>{errorText(error)}</div>}

      <button
        type='submit'
        className={styles.authButton}
        disabled={isDisabled}>
        {isPending ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
