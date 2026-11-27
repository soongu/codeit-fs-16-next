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

// 그 방의 안 읽은 수를 0 으로 - 목록의 그 줄과 대화방 하나의 캐시를 함께 고친다.
export function clearUnread(queryClient, conversationId) {
  queryClient.setQueryData(["conversations"], (old) => {
    if (!old) return old;
    return {
      ...old,
      pages: old.pages.map((page) => ({
        ...page,
        items: page.items.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c)),
      })),
    };
  });
  queryClient.setQueryData(["conversation", conversationId], (old) => (old ? { ...old, unreadCount: 0 } : old));
}

// 그 방을 읽음으로 - 서버에 알리고 안 읽은 수를 0 으로, 사이드바 수는 다시 묻는다. 읽음으로 바뀐 수를 돌려준다.
export async function readConversation(queryClient, conversationId) {
  const { readCount } = await conversationApi.markAsRead(conversationId);
  clearUnread(queryClient, conversationId);
  queryClient.invalidateQueries({ queryKey: ["unreadConversations"] });
  return readCount;
}

// 메시지가 온 방을 목록 맨 위로 올리고 미리보기와 시각을 바꾼다 - 받은 메시지에 필요한 값이 다 있다.
// 상대가 보낸 메시지면(fromOther) 안 읽은 수를 하나 늘린다.
// 받아 둔 페이지에 그 방이 없으면 false 를 돌려준다 - 부른 쪽이 목록을 다시 받는다.
export function moveToTop(queryClient, message, fromOther) {
  let found = false;
  queryClient.setQueryData(["conversations"], (old) => {
    if (!old) return old;
    const row = old.pages.flatMap((page) => page.items).find((c) => c.id === message.conversationId);
    if (!row) return old;
    found = true;

    const { id, senderId, content, createdAt } = message;
    const moved = {
      ...row,
      lastMessage: { id, senderId, content, createdAt },
      lastMessageAt: createdAt,
      unreadCount: fromOther ? row.unreadCount + 1 : row.unreadCount,
    };
    // 그 방이 있던 페이지에서 빼고 첫 페이지 맨 앞에 넣는다.
    const pages = old.pages.map((page) => ({ ...page, items: page.items.filter((c) => c.id !== row.id) }));
    pages[0] = { ...pages[0], items: [moved, ...pages[0].items] };
    return { ...old, pages };
  });
  return found;
}
