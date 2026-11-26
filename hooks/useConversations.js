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

// 메시지가 온 방을 목록 맨 위로 올리고 미리보기와 시각을 바꾼다 - 받은 메시지에 필요한 값이 다 있다.
// 받아 둔 페이지에 그 방이 없으면 false 를 돌려준다 - 부른 쪽이 목록을 다시 받는다.
export function moveToTop(queryClient, message) {
  let found = false;
  queryClient.setQueryData(["conversations"], (old) => {
    if (!old) return old;
    const row = old.pages.flatMap((page) => page.items).find((c) => c.id === message.conversationId);
    if (!row) return old;
    found = true;

    const { id, senderId, content, createdAt } = message;
    const moved = { ...row, lastMessage: { id, senderId, content, createdAt }, lastMessageAt: createdAt };
    // 그 방이 있던 페이지에서 빼고 첫 페이지 맨 앞에 넣는다.
    const pages = old.pages.map((page) => ({ ...page, items: page.items.filter((c) => c.id !== row.id) }));
    pages[0] = { ...pages[0], items: [moved, ...pages[0].items] };
    return { ...old, pages };
  });
  return found;
}
