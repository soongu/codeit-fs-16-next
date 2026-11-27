// ~/instagram-next/hooks/useMarkSeen.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "@/services/api.js";

// 알림 패널을 열었다고 서버에 알린다 - 서버가 받으면 받아 둔 «아직 안 본 알림 수» 를 응답(0)으로 바꾼다.
export function useMarkSeen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationApi.markSeen,
    onSuccess: (data) => {
      queryClient.setQueryData(["unseenNotifications"], data);
    },
  });
}
