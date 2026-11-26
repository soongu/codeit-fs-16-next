// ~/instagram-next/hooks/useDmRealtime.js
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/services/socket.js";
import { addMessage } from "@/hooks/useMessages.js";
import { moveToTop, readConversation, clearUnread } from "@/hooks/useConversations.js";

// 실시간으로 오는 DM 을 듣는다 - 로그인한 화면 전체에서 한 번만 부른다.
export function useDmRealtime() {
  const queryClient = useQueryClient();
  // 지금 보고 있는 주소 - 메시지 창이 열린 방(/direct/t/7 의 7)에 온 메시지는 바로 읽음으로 한다.
  const pathname = usePathname();

  useEffect(() => {
    // 화면이 열리면 바로 연결한다 - 보내기 전에도 받을 수 있게.
    const socket = getSocket();

    // 메시지가 오면 그 방의 이력 캐시에 넣고 목록에서 그 방을 맨 위로 올린다 - 받은 메시지를 그대로 쓰니 요청이 없다.
    const handleMessage = (message) => {
      // 내가 다른 탭에서 보낸 메시지도 온다 - 상대가 보낸 것인지는 «나» 의 번호와 비교해 안다.
      const me = queryClient.getQueryData(["me"]);
      const fromOther = message.senderId !== me?.id;
      // 상대가 보냈고 그 방의 창을 보고 있으면 받자마자 읽은 것이다.
      const readNow = fromOther && pathname === `/direct/t/${message.conversationId}`;

      // 바로 읽은 메시지는 읽은 채로 넣는다 - «New messages» 줄은 창을 연 순간에 안 읽었던 메시지 앞에만 둔다.
      addMessage(queryClient, readNow ? { ...message, isRead: true } : message);
      // 목록에 없던 방이면(지운 방에 새 메시지가 왔거나 아직 안 받은 페이지의 방) 목록을 다시 받는다.
      if (!moveToTop(queryClient, message, fromOther && !readNow)) {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      }

      if (readNow) {
        // 서버에도 읽었다고 알린다 - 실패해도 창은 그대로 쓴다. 다음에 창을 열 때 다시 알린다.
        readConversation(queryClient, message.conversationId).catch(() => {});
      } else if (fromOther) {
        // 사이드바 점 - 안 읽은 방이 새로 생겼는지는 서버에 다시 묻는다(목록을 안 받은 화면에서도 맞게).
        queryClient.invalidateQueries({ queryKey: ["unreadConversations"] });
      }
    };

    // 누군가 그 방을 읽었다 - 상대가 읽었으면 내가 보낸 메시지를 읽음으로, 내가 다른 탭에서 읽었으면 안 읽음 표시를 지운다.
    const handleRead = ({ conversationId, readerId }) => {
      const me = queryClient.getQueryData(["me"]);

      if (readerId === me?.id) {
        clearUnread(queryClient, conversationId);
        queryClient.invalidateQueries({ queryKey: ["unreadConversations"] });
        return;
      }

      queryClient.setQueryData(["messages", conversationId], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: page.items.map((m) => (m.senderId === me?.id ? { ...m, isRead: true } : m)),
          })),
        };
      });
    };

    // 끊겼던 연결이 다시 이어졌다 - 끊긴 동안 온 메시지는 이벤트로 오지 않았으니 받아 둔 것을 모두 다시 받는다.
    const handleReconnect = () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["unreadConversations"] });
    };

    socket.on("dm:message", handleMessage);
    socket.on("dm:read", handleRead);
    // 다시 이어진 것은 연결 하나(socket)가 아니라 그 뒤의 관리자(socket.io)가 알린다.
    socket.io.on("reconnect", handleReconnect);

    // 화면이 사라지거나 주소가 바뀌면 듣기를 멈춘다 - 같은 함수를 넘겨야 그 함수만 뗀다. 주소가 바뀌면 새 주소로 다시 건다.
    return () => {
      socket.off("dm:message", handleMessage);
      socket.off("dm:read", handleRead);
      socket.io.off("reconnect", handleReconnect);
    };
  }, [queryClient, pathname]);
}
