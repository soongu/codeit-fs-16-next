// ~/instagram-next/components/NotificationRealtime.jsx
"use client";

import { useNotificationRealtime } from "@/hooks/useNotificationRealtime.js";

// 실시간 알림을 듣기만 하는 컴포넌트 - 화면에 그리는 것은 없다.
export default function NotificationRealtime() {
  useNotificationRealtime();

  return null;
}
