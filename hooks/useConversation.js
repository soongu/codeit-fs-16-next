// ~/instagram-next/hooks/useConversation.js
import { useQuery } from "@tanstack/react-query";
import { conversationApi } from "@/services/api.js";
import { retryOnServerError } from "@/hooks/useMe.js";

// 대화방 하나 - 메시지 창이 주소의 번호만으로 그 방의 상대를 받는다.
export function useConversation(conversationId) {
  return useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => conversationApi.get(conversationId),
    retry: retryOnServerError,
  });
}
