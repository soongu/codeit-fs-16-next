// ~/instagram-next/hooks/useNotificationRealtime.js
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/services/socket.js";
import { notificationApi } from "@/services/api.js";
import { useUiStore } from "@/stores/useUiStore.js";
import { addNotification, removeNotification } from "@/hooks/useNotifications.js";

// 실시간으로 오는 알림을 듣는다 - 로그인한 화면 전체에서 한 번만 부른다.
export function useNotificationRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    // 새 알림이 왔다.
    const handleNew = (notification) => {
      // 받은 알림은 목록의 한 줄과 같은 모양이라 그대로 맨 위에 붙인다 - 목록을 다시 받지 않는다.
      addNotification(queryClient, notification);

      // 패널을 보고 있으면 방금 온 알림도 본 것이다 - 서버에도 다시 «봤다» 고 알리고 점은 그 응답(0)으로.
      // 지금 패널이 열려 있는지는 이벤트가 온 그 순간의 값을 store 에서 바로 읽는다.
      if (useUiStore.getState().isNotificationOpen) {
        notificationApi
          .markSeen()
          .then((data) => queryClient.setQueryData(["unseenNotifications"], data))
          .catch(() => {});
        return;
      }
      // 패널이 닫혀 있으면 사이드바 점은 «아직 안 본 알림 수» 를 서버에 다시 묻는다.
      queryClient.invalidateQueries({ queryKey: ["unseenNotifications"] });
    };

    // 알림이 사라졌다(좋아요 취소 등) - 그 알림이 아직 안 본 알림이었을 수 있으니 수를 다시 묻는다.
    const handleRemoved = ({ id }) => {
      removeNotification(queryClient, id);
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
