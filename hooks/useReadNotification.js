// ~/instagram-next/hooks/useReadNotification.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "@/services/api.js";

// 받아 둔 알림 목록의 페이지마다 그 알림 줄의 isRead 만 true 로 바꾼다.
function markRow(data, id) {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    })),
  };
}

// 알림 하나를 읽음으로 바꾼다 - 서버에 알리고, 서버가 받으면 받아 둔 목록의 그 줄도 고친다.
export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => notificationApi.markAsRead(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData(["notifications"], (data) => (data ? markRow(data, id) : data));
    },
  });
}
