// ~/instagram-next/hooks/useMessages.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { conversationApi } from "@/services/api.js";

// 그 대화방의 메시지 - 서버는 가장 최근 메시지부터 20개씩 준다.
export function useMessages(conversationId) {
  return useInfiniteQuery({
    queryKey: ["messages", conversationId],
    queryFn: ({ pageParam }) => conversationApi.getMessages(conversationId, pageParam === null ? undefined : { cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
