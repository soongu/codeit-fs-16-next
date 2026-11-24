// ~/instagram-next/hooks/useHashtagPosts.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { hashtagApi } from "@/services/api.js";
import { retryOnServerError } from "@/hooks/useMe.js";

// 그리드가 한 줄에 셋이라 셋의 배수로 받는다.
const PER_PAGE = 12;

// 해시태그 하나가 붙은 게시물을 12개씩 받는다. 커서는 피드처럼 서버가 준 것을 그대로 돌려준다.
export function useHashtagPosts(name) {
  return useInfiniteQuery({
    queryKey: ["hashtagPosts", name],
    queryFn: ({ pageParam }) =>
      hashtagApi.getPosts(name, pageParam === null ? { limit: PER_PAGE } : { limit: PER_PAGE, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    // 없는 태그(404)는 다시 보내도 없다 - 서버 쪽 실패만 다시 보낸다.
    retry: retryOnServerError,
  });
}
