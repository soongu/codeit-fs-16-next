// ~/instagram-next/hooks/useFollowList.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { profileApi } from "@/services/api.js";

// 그 사람의 팔로워 목록(list = "followers")이나 팔로잉 목록(list = "following")을 20명씩 받는다.
export function useFollowList(username, list) {
  return useInfiniteQuery({
    queryKey: ["followList", username, list],
    queryFn: ({ pageParam }) => profileApi.getFollowList(username, list, pageParam === null ? undefined : { cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
