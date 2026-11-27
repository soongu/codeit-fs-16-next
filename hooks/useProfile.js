// ~/instagram-next/hooks/useProfile.js
import { useQuery } from "@tanstack/react-query";
import { profileApi } from "@/services/api.js";
import { retryOnServerError } from "@/hooks/useMe.js";

// 한 사람의 프로필 헤더 - 사용자 이름마다 따로 받아 둔다.
export function useProfile(username) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => profileApi.get(username),
    // 없는 사람(404)은 다시 보내도 없다 - 서버 쪽 실패만 다시 보낸다.
    retry: retryOnServerError,
  });
}
