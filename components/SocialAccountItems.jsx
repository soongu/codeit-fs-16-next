// ~/instagram-next/components/SocialAccountItems.jsx
"use client";

import { usePathname } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaGoogle } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import styles from "./Sidebar.module.scss";
import { authApi, ApiError } from "@/services/api.js";
import { useUiStore } from "@/stores/useUiStore.js";

// 메뉴에 그릴 제공자 셋 — 이 차례로 그린다.
const PROVIDERS = [
  { provider: "google", name: "Google", icon: <FaGoogle /> },
  { provider: "kakao", name: "카카오", icon: <RiKakaoTalkFill /> },
  { provider: "naver", name: "네이버", icon: <SiNaver /> },
];

// «더 보기» 메뉴의 소셜 계정 항목 — 이어진 제공자는 «연결 끊기», 아닌 제공자는 «연결하기».
// 메뉴가 열려 있을 때만 그려지는 컴포넌트라, 메뉴를 열 때마다 내 소셜 계정 목록을 새로 받는다.
export default function SocialAccountItems({ onUnlink }) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const showToast = useUiStore((state) => state.showToast);
  const { data } = useQuery({ queryKey: ["social-accounts"], queryFn: authApi.socialAccounts });

  const { mutate: unlink } = useMutation({
    mutationFn: authApi.unlinkSocialAccount,
    onSuccess: (result, provider) => {
      // 메뉴는 이미 닫혀 있어서 이 목록을 보는 컴포넌트가 없다 — 그래도 지금 다시 받아 두게 refetchType 을 "all" 로 준다.
      queryClient.invalidateQueries({ queryKey: ["social-accounts"], refetchType: "all" });
      const { name } = PROVIDERS.find((item) => item.provider === provider);
      showToast(`${name} 계정 연결을 끊었어요`);
    },
    onError: (error) => {
      // 서버가 거절했으면(마지막 로그인 방법 등) 서버의 문장을 그대로 보여 준다.
      showToast(error instanceof ApiError ? error.message : "연결을 끊지 못했어요. 다시 시도해 주세요.", "error");
    },
  });

  // 목록을 받기 전에는 제공자 항목을 그리지 않는다 — 연결하기와 끊기 가운데 무엇을 그릴지 아직 모른다.
  if (data === undefined) {
    return null;
  }

  const linked = data.socialAccounts.map((account) => account.provider);
  // 연결을 마치면 지금 보던 화면으로 돌아오게 지금 주소를 ?next= 에 싣는다.
  const query = new URLSearchParams({ next: pathname });

  return (
    <>
      {PROVIDERS.map(({ provider, name, icon }) =>
        linked.includes(provider) ? (
          <button
            key={provider}
            type="button"
            className={styles.menuItem}
            onClick={() => {
              // 로그아웃처럼 메뉴부터 닫고 끊는다 — 결과는 알림으로 알려 준다.
              onUnlink();
              unlink(provider);
            }}
          >
            {icon}
            <span>{name} 연결 끊기</span>
          </button>
        ) : (
          // 연결하기는 요청이 아니라 이동이다 — 화면 전체가 제공자에게 갔다가 돌아온다. 그래서 a 로 그린다.
          <a key={provider} href={`/api/v2/auth/${provider}/link?${query}`} className={styles.menuItem}>
            {icon}
            <span>{name} 연결하기</span>
          </a>
        ),
      )}
      <div className={styles.menuDivider} />
    </>
  );
}
