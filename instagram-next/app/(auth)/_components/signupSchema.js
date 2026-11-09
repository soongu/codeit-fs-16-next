// ~/instagram-next/app/(auth)/_components/signupSchema.js
import { z } from 'zod';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE = /^010-?\d{4}-?\d{4}$/;

// 서버의 schemas/authSchema.js 와 같은 규칙이다 — 보내기 전에 화면에서 먼저 알려 주려고 한 벌 더 둔다.
export const signupSchema = z.object({
  emailOrPhone: z
    .string()
    .trim()
    .refine((value) => EMAIL.test(value) || PHONE.test(value), {
      error: '이메일 주소나 휴대폰 번호를 적어 주세요',
    }),
  name: z.string().trim().min(1, { error: '성명을 적어 주세요' }),
  username: z
    .string()
    .min(1, { error: '사용자 이름을 적어 주세요' })
    .max(30, { error: '사용자 이름은 30자까지 쓸 수 있어요' })
    .regex(/^[a-zA-Z0-9._]+$/, {
      error: '사용자 이름은 영문, 숫자, 밑줄(_), 마침표(.)만 쓸 수 있어요',
    }),
  password: z.string().min(8, { error: '비밀번호는 8자 이상이어야 해요' }),
});
