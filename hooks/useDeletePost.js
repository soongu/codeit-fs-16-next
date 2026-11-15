// ~/instagram-next/hooks/useDeletePost.js
import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/services/api.js";

// 게시물을 지운다 — 글쓴이(또는 관리자)인지는 서버가 로그인 정보로 확인한다.
export function useDeletePost() {
  return useMutation({
    mutationFn: (postId) => postApi.remove(postId),
  });
}
