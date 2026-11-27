// ~/instagram-next/hooks/useUnreadConversations.js
import { useQuery } from "@tanstack/react-query";
import { conversationApi } from "@/services/api.js";

// 안 읽은 메시지가 있는 내 대화방 수 - 사이드바의 «메시지» 옆 점이 쓴다.
export function useUnreadConversations() {
  return useQuery({
    queryKey: ["unreadConversations"],
    queryFn: conversationApi.getUnread,
  });
}
