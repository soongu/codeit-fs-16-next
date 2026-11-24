// ~/instagram-next/hooks/useReplies.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { commentApi } from "@/services/api.js";
import { retryOnServerError } from "@/hooks/useMe.js";

const PER_PAGE = 3;

function getReplyPage(postId, commentId, pageParam) {
  const params = { limit: PER_PAGE };

  // 첫 페이지에는 커서가 없다. 댓글 목록의 getCommentPage 와 같다.
  if (pageParam !== null) {
    params.cursor = pageParam;
  }

  return commentApi.getReplies(postId, commentId, params);
}

// 원댓글 하나에 달린 답글을 오래된 것부터 3개씩 받는다.
// enabled 가 false 인 동안은 받지 않는다. «답글 보기» 를 누른 원댓글만 받는다.
export function useReplies(postId, commentId, enabled) {
  return useInfiniteQuery({
    queryKey: ["replies", postId, commentId],
    queryFn: ({ pageParam }) => getReplyPage(postId, commentId, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
    // 없는 댓글(404)이나 답글 번호(400)는 다시 보내도 같은 답이다. 연결 실패와 5xx 만 다시 보낸다.
    retry: retryOnServerError,
  });
}
