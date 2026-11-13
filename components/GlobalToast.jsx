// ~/instagram-next/components/GlobalToast.jsx
"use client";

import { useUiStore } from "@/stores/useUiStore.js";
import Toast from "./Toast.jsx";

// 어느 화면에서 띄운 알림이든 여기서 그린다 — 알림의 글자와 종류는 store 에 있다.
export default function GlobalToast() {
  const toast = useUiStore((state) => state.toast);
  const hideToast = useUiStore((state) => state.hideToast);

  return (
    <Toast
      message={toast?.message}
      isVisible={toast !== null}
      onClose={hideToast}
      duration={3000}
      variant={toast?.variant}
    />
  );
}
