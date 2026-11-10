// ~/instagram-next/app/(auth)/_components/SignupForm.jsx
'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import styles from './SignupPage.module.scss';
import { signupSchema, PHONE } from './signupSchema.js';
import { useDuplicateCheck } from './useDuplicateCheck.js';


async function signup(form) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  const body = await response.json();

  // 409·400 이면 서버가 보낸 문장을 그대로 에러로 던진다.
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
}


// 입력칸 하나 — 칸마다 같은 마크업을 되풀이하지 않으려고 컴포넌트로 뗐다.
function SignupField({ type, name, placeholder, value, onChange, error }) {
  // 아무것도 안 친 칸은 빨간색도 초록색도 아니다.
  const typed = value !== "";
  const failed = typed && error !== undefined;
  const passed = typed && error === undefined;

  return (
    <div
      className={`${styles.formField} ${failed ? styles.error : ""} ${passed ? styles.success : ""}`}
    >
      <div className={styles.inputContainer}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
        />
        {passed &&<div className={styles.successIcon}></div>}
        {failed &&<div className={styles.errorIcon}></div>}
      </div>
      {failed &&<span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default function SignupForm() {

  const router = useRouter();
  const queryClient = useQueryClient();

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


  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    // 가입이 끝나면 로그인 화면으로 간다.
    onSuccess: (data) =>
      router.push(`/login?${new URLSearchParams({ username: data.username })}`),
    // 중복 확인을 통과한 뒤에 누가 먼저 가입했을 수 있다 — 칸마다 다시 묻게 한다.
    onError: () =>
      queryClient.invalidateQueries({ queryKey: ['check-duplicate'] }),
  });

  const handleSubmit = (event) => {
    // 브라우저가 폼을 주소에 실어 보내는 기본 동작을 막고, 우리가 직접 보낸다.
    event.preventDefault();
    mutate(form);
  };


  // 그릴 때마다 지금 입력값을 규칙에 대 본다 — 결과를 State 로 따로 들고 있지 않는다.
  const result = signupSchema.safeParse(form);
  const errors = result.success ? {} : z.flattenError(result.error).fieldErrors;

  const contactType = PHONE.test(form.emailOrPhone.trim()) ? 'phone' : 'email';
  const contactCheck = useDuplicateCheck(
    contactType,
    form.emailOrPhone,
    !errors.emailOrPhone,
  );
  const usernameCheck = useDuplicateCheck(
    'username',
    form.username,
    !errors.username,
  );

  // 규칙은 통과했는데 누가 이미 쓰고 있으면 서버가 준 문장을 보여 준다.
  const takenMessage = (check) =>
    check?.available === false ? check.message : undefined;

  const canSubmit =
    result.success &&
    contactCheck?.available === true &&
    usernameCheck?.available === true;

  return (
    <form
      className={styles.authForm}
      onSubmit={handleSubmit}
      noValidate>
      <SignupField
        type='email'
        name='emailOrPhone'
        placeholder='휴대폰 번호 또는 이메일 주소'
        value={form.emailOrPhone}
        onChange={handleChange}
        error={errors.emailOrPhone?.[0] ?? takenMessage(contactCheck)}
        checked={contactCheck !== undefined}
      />
      <SignupField
        type='text'
        name='name'
        placeholder='성명'
        value={form.name}
        onChange={handleChange}
        error={errors.name?.[0]}
      />
      <SignupField
        type='text'
        name='username'
        placeholder='사용자 이름'
        value={form.username}
        onChange={handleChange}
        error={errors.username?.[0] ?? takenMessage(usernameCheck)}
        checked={usernameCheck !== undefined}
      />
      <SignupField
        type='password'
        name='password'
        placeholder='비밀번호'
        value={form.password}
        onChange={handleChange}
        error={errors.password?.[0]}
      />

      <p className={styles.privacyText}>
        저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에
        업로드했을 수도 있습니다.
        <a href='#'>더 알아보기</a>
      </p>

      {error && <span className={styles.errorMessage}>{error.message}</span>}

      <button
        type='submit'
        className={styles.authButton}
        disabled={!canSubmit || isPending}>
        가입
      </button>
    </form>
  );
}
