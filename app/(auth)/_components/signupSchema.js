// ~/instagram-next/app/(auth)/_components/signupSchema.js
import { z } from "zod";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE = /^010-?\d{4}-?\d{4}$/;

// bcrypt 는 비밀번호의 앞 72바이트까지만 쓴다 — 서버와 같은 기준으로 UTF-8 바이트 수를 센다.
const fitsBcrypt = (value) => new TextEncoder().encode(value).length <= 72;

// 서버의 schemas/authSchema.js 와 같은 규칙이다 — 보내기 전에 화면에서 먼저 알려 주려고 한 벌 더 둔다.
export const signupSchema = z.object({
  emailOrPhone: z
    .string()
    .trim()
    .refine((value) => EMAIL.test(value) || PHONE.test(value), {
      error: "이메일 주소나 휴대폰 번호를 적어 주세요",
    }),
  name: z.string().trim().min(1, { error: "성명을 적어 주세요" }),
  username: z
    .string()
    .min(1, { error: "사용자 이름을 적어 주세요" })
    .max(30, { error: "사용자 이름은 30자까지 쓸 수 있어요" })
    .regex(/^[a-zA-Z0-9._]+$/, {
      error: "사용자 이름은 영문, 숫자, 밑줄(_), 마침표(.)만 쓸 수 있어요",
    })
    // 서버와 같은 규칙 - 휴대폰 번호 모양의 사용자 이름으로는 로그인할 수 없어서 가입 때 막는다.
    .refine((value) => !PHONE.test(value), { error: "휴대폰 번호 모양은 사용자 이름으로 쓸 수 없어요" }),
  password: z
    .string()
    .min(8, { error: "비밀번호는 8자 이상이어야 해요" })
    .refine(fitsBcrypt, { error: "비밀번호가 너무 길어요. 영문은 72자, 한글은 24자까지 쓸 수 있어요" }),
});
