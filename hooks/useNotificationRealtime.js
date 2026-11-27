// ~/instagram-next/hooks/useNotificationRealtime.js
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/services/socket.js";

// 실시간으로 오는 알림을 듣는다 - 로그인한 화면 전체에서 한 번만 부른다.
export function useNotificationRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    // 새 알림이 왔다 - 사이드바 점은 «아직 안 본 알림 수» 를 서버에 다시 묻는다.
    const handleNew = () => {
      queryClient.invalidateQueries({ queryKey: ["unseenNotifications"] });
    };

    // 알림이 사라졌다(좋아요 취소 등) - 그 알림이 아직 안 본 알림이었을 수 있으니 수를 다시 묻는다.
    const handleRemoved = () => {
      queryClient.invalidateQueries({ queryKey: ["unseenNotifications"] });
    };

    socket.on("notification:new", handleNew);
    socket.on("notification:removed", handleRemoved);

    return () => {
      socket.off("notification:new", handleNew);
      socket.off("notification:removed", handleRemoved);
    };
  }, [queryClient]);
}
