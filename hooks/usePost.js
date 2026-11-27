// ~/instagram-next/hooks/usePost.js
import { useQuery } from "@tanstack/react-query";
import { postApi } from "@/services/api.js";
import { useMe, retryOnServerError } from "@/hooks/useMe.js";

// 게시물 하나 — 피드 목록처럼 보는 사람의 번호를 키에 넣는다. 누가 보느냐에 따라 liked 가 달라진다.
export function usePost(postId) {
  const { data: me } = useMe();

  return useQuery({
    queryKey: ["post", postId, me?.id],
    queryFn: () => postApi.get(postId),
    // 누가 보는지 알기 전에는 보내지 않는다.
    enabled: me !== undefined,
    // 없는 게시물(404)은 다시 보내도 같은 답이다 — 연결 실패와 5xx 만 다시 보낸다.
    retry: retryOnServerError,
  });
}
