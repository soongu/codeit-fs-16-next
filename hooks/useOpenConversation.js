// ~/instagram-next/hooks/useOpenConversation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { conversationApi } from "@/services/api.js";

// 그 사람과의 대화방을 열고 그 방의 메시지 창으로 간다.
export function useOpenConversation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (username) => conversationApi.open(username),
    onSuccess: (conversation) => {
      // 받은 대화방은 메시지 창이 그대로 쓴다 - 창이 열리자마자 머리를 그린다.
      queryClient.setQueryData(["conversation", conversation.id], conversation);
      // 새로 만든 방이면 목록에 없다 - 목록을 다시 받는다.
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      router.push(`/direct/t/${conversation.id}`);
    },
  });
}
