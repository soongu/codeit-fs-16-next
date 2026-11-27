// ~/instagram-next/hooks/useNotifications.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { notificationApi } from "@/services/api.js";

// 내 알림 목록을 20개씩 받는다.
export function useNotifications() {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) => notificationApi.getPage(pageParam === null ? undefined : { cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
