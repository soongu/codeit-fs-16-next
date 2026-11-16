// ~/instagram-next/hooks/useComments.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { commentApi } from "@/services/api.js";
import { retryOnServerError } from "@/hooks/useMe.js";

const PER_PAGE = 20;

function getCommentPage(postId, pageParam) {
  const params = { limit: PER_PAGE };

  // 첫 페이지에는 커서가 없다 — 피드의 getPostPage 와 같다.
  if (pageParam !== null) {
    params.cursor = pageParam;
  }

  return commentApi.getPage(postId, params);
}

// 게시물 하나의 댓글 — 오래된 것부터 20개씩 받는다.
// 보는 사람의 번호는 키에 넣지 않는다. 댓글 응답에는 누가 보느냐에 따라 달라지는 값이 없다.
export function useComments(postId) {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => getCommentPage(postId, pageParam),
    initialPageParam: null,
    // 서버가 준 커서를 다음 요청에 그대로 싣는다 — 마지막 페이지면 null 이 와서 다음 페이지가 없다.
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    // 없는 게시물(404)은 다시 보내도 같은 답이다 — 연결 실패와 5xx 만 다시 보낸다.
    retry: retryOnServerError,
  });
}
