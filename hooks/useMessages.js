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

// 새 메시지 하나를 그 방의 이력 캐시에 넣는다 - 첫 페이지(가장 최근 메시지들)의 맨 앞, 서버가 주는 차례(최신 먼저)와 같게.
// 같은 번호가 이미 있으면 넣지 않는다 - 내가 보낸 메시지는 ack 로도, dm:message 로도 온다.
// 그 방의 이력을 아직 안 받았으면(old 가 없으면) 그대로 둔다 - 창을 열 때 받는다.
export function addMessage(queryClient, message) {
  queryClient.setQueryData(["messages", message.conversationId], (old) => {
    if (!old) return old;
    const [first, ...rest] = old.pages;
    if (first.items.some((m) => m.id === message.id)) return old;
    return { ...old, pages: [{ ...first, items: [message, ...first.items] }, ...rest] };
  });
}
