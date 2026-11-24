// ~/instagram-next/hooks/useProfilePosts.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { profileApi } from "@/services/api.js";
import { retryOnServerError } from "@/hooks/useMe.js";

// 그리드가 한 줄에 셋이라 셋의 배수로 받는다.
const PER_PAGE = 12;

// 한 사람이 올린 게시물을 12개씩 받는다 - 해시태그 페이지의 그리드와 같은 방법이다.
export function useProfilePosts(username) {
  return useInfiniteQuery({
    queryKey: ["profilePosts", username],
    queryFn: ({ pageParam }) =>
      profileApi.getPosts(username, pageParam === null ? { limit: PER_PAGE } : { limit: PER_PAGE, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    // 없는 사람(404)은 다시 보내도 없다 - 서버 쪽 실패만 다시 보낸다.
    retry: retryOnServerError,
  });
}
