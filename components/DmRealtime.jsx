// ~/instagram-next/components/DmRealtime.jsx
"use client";

import { useDmRealtime } from "@/hooks/useDmRealtime.js";

// 실시간 DM 을 듣기만 하는 컴포넌트 - 화면에 그리는 것은 없다.
export default function DmRealtime() {
  useDmRealtime();

  return null;
}
