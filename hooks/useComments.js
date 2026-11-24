// ~/instagram-next/hooks/useComments.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { commentApi } from "@/services/api.js";
import { retryOnServerError } from "@/hooks/useMe.js";

const PER_PAGE = 20;

// 받아 둔 댓글 페이지들에서 그 댓글 하나를 바꾼 새 데이터를 만든다. 받아 둔 목록이 없으면 그대로 둔다.
// 피드의 changePost 와 같은 꼴이다. 답글을 달거나 지울 때 원댓글 줄의 replyCount 를 바꾸는 데 쓴다.
export function changeComment(data, commentId, change) {
  if (data === undefined) return data;

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map((comment) => (comment.id === commentId ? { ...comment, ...change(comment) } : comment)),
    })),
  };
}

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
