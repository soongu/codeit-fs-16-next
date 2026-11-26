// ~/instagram-next/hooks/useConversations.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { conversationApi } from "@/services/api.js";

// 내 대화방 목록 - 마지막 메시지가 늦은 방부터 20개씩 받는다.
export function useConversations() {
  return useInfiniteQuery({
    queryKey: ["conversations"],
    queryFn: ({ pageParam }) => conversationApi.getPage(pageParam === null ? undefined : { cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
