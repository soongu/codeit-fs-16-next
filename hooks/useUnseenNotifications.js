// ~/instagram-next/hooks/useUnseenNotifications.js
import { useQuery } from "@tanstack/react-query";
import { notificationApi } from "@/services/api.js";

// 아직 안 본 알림 수 - 사이드바의 «알림» 옆 점이 쓴다.
export function useUnseenNotifications() {
  return useQuery({
    queryKey: ["unseenNotifications"],
    queryFn: notificationApi.getUnseen,
  });
}
