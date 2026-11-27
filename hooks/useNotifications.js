// ~/instagram-next/hooks/useNotifications.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { notificationApi } from "@/services/api.js";

// 내 알림 목록을 20개씩 받는다 - 패널이 열려 있을 때(enabled 가 true)만 받는다.
export function useNotifications(enabled) {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) => notificationApi.getPage(pageParam === null ? undefined : { cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });
}

// 새 알림 하나를 받아 둔 목록의 첫 페이지 맨 앞에 넣는다 - 서버가 주는 차례(최신 먼저)와 같다.
// 같은 번호가 이미 있으면 넣지 않는다 - 패널을 여는 요청과 이벤트가 같은 알림을 함께 가져올 수 있다.
// 목록을 아직 안 받았으면(패널을 한 번도 안 열었으면) 그대로 둔다 - 열 때 받는다.
export function addNotification(queryClient, notification) {
  queryClient.setQueryData(["notifications"], (old) => {
    if (!old) return old;
    const [first, ...rest] = old.pages;
    if (first.items.some((n) => n.id === notification.id)) return old;
    return { ...old, pages: [{ ...first, items: [notification, ...first.items] }, ...rest] };
  });
}

// 사라진 알림을 받아 둔 목록의 모든 페이지에서 뺀다.
export function removeNotification(queryClient, id) {
  queryClient.setQueryData(["notifications"], (old) => {
    if (!old) return old;
    return { ...old, pages: old.pages.map((page) => ({ ...page, items: page.items.filter((n) => n.id !== id) })) };
  });
}
