// ~/instagram-next/hooks/useAddComment.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentApi } from "@/services/api.js";

// 게시물에 댓글을 단다. 누가 다는지는 서버가 로그인 정보로 정한다.
export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }) => commentApi.create(postId, content),
    // 달았으면 그 게시물의 댓글을 다시 받는다. 게시물을 올린 뒤 피드를 다시 받은 것과 같다.
    onSuccess: (result, { postId }) => queryClient.invalidateQueries({ queryKey: ["comments", postId] }),
  });
}
