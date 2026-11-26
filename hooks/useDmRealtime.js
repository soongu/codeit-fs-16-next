// ~/instagram-next/hooks/useDmRealtime.js
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/services/socket.js";
import { addMessage } from "@/hooks/useMessages.js";
import { moveToTop } from "@/hooks/useConversations.js";

// 실시간으로 오는 DM 을 듣는다 - 로그인한 화면 전체에서 한 번만 부른다.
export function useDmRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // 화면이 열리면 바로 연결한다 - 보내기 전에도 받을 수 있게.
    const socket = getSocket();

    // 메시지가 오면 그 방의 이력 캐시에 넣고 목록에서 그 방을 맨 위로 올린다 - 받은 메시지를 그대로 쓰니 요청이 없다.
    const handleMessage = (message) => {
      addMessage(queryClient, message);
      // 목록에 없던 방이면(지운 방에 새 메시지가 왔거나 아직 안 받은 페이지의 방) 목록을 다시 받는다.
      if (!moveToTop(queryClient, message)) {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      }
    };

    socket.on("dm:message", handleMessage);

    // 화면이 사라지면 듣기를 멈춘다 - 같은 함수를 넘겨야 그 함수만 뗀다.
    return () => {
      socket.off("dm:message", handleMessage);
    };
  }, [queryClient]);
}
