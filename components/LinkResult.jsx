// ~/instagram-next/components/LinkResult.jsx
"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUiStore } from "@/stores/useUiStore.js";

// 소셜 계정을 이으러 갔다가 돌아오면 서버가 보던 주소에 결과를 실어 보낸다 — 성공은 ?linked=제공자, 실패는 ?error=에러 코드.
// 주소에 적힌 글자를 그대로 보여 주지 않고, 이 표로 문장을 고른다.
const LINKED = {
  google: "Google 계정을 연결했어요",
  kakao: "카카오 계정을 연결했어요",
  naver: "네이버 계정을 연결했어요",
};

const LINK_ERRORS = {
  SOCIAL_ACCOUNT_TAKEN: "다른 사용자에게 연결된 계정이라 연결하지 못했어요. 다른 계정으로 시도해 주세요.",
  PROVIDER_ALREADY_LINKED: "이미 연결된 계정이 있어서 연결하지 못했어요. 그 연결을 끊은 뒤 다시 시도해 주세요.",
  LOGIN_REQUIRED: "로그인을 확인하지 못해서 연결하지 못했어요. 다시 시도해 주세요.",
};

// 표에 없는 코드가 와도 연결하지 못한 것은 같다 — 다시 시도하라는 문장을 보여 준다.
const LINK_FAILED = "연결하지 못했어요. 다시 시도해 주세요.";

export default function LinkResult() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showToast = useUiStore((state) => state.showToast);
  const linked = searchParams.get("linked");
  const error = searchParams.get("error");

  useEffect(() => {
    if (linked === null && error === null) {
      return;
    }

    if (linked !== null && Object.hasOwn(LINKED, linked)) {
      showToast(LINKED[linked]);
    } else if (error !== null) {
      showToast(Object.hasOwn(LINK_ERRORS, error) ? LINK_ERRORS[error] : LINK_FAILED, "error");
    }

    // 결과를 알렸으면 주소에서 지운다 — 새로고침하거나 주소를 복사해도 알림이 다시 뜨지 않게.
    router.replace(pathname);
  }, [linked, error, pathname, router, showToast]);

  // 화면에 그리는 것은 없다 — 주소를 읽어 알림을 띄우고 주소를 정리하기만 한다.
  return null;
}
