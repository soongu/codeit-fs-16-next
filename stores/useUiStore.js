// ~/instagram-next/stores/useUiStore.js
import { create } from "zustand";

// 화면 여러 곳이 함께 보는 값 — 서버와는 상관없다.
export const useUiStore = create((set) => ({
  isCreateFeedOpen: false,
  openCreateFeed: () => set({ isCreateFeedOpen: true }),
  closeCreateFeed: () => set({ isCreateFeedOpen: false }),

  // 검색 패널과 알림 패널은 같은 자리에 열린다 - 하나를 열면 다른 하나는 닫는다.
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen, isNotificationOpen: false })),
  closeSearch: () => set({ isSearchOpen: false }),

  isNotificationOpen: false,
  toggleNotification: () => set((state) => ({ isNotificationOpen: !state.isNotificationOpen, isSearchOpen: false })),
  closeNotification: () => set({ isNotificationOpen: false }),

  // 열려 있는 패널을 모두 닫는다 - 사이드바의 링크나 바깥 어두운 곳을 눌렀을 때.
  closePanels: () => set({ isSearchOpen: false, isNotificationOpen: false }),

  // 화면 위쪽에 잠깐 띄우는 알림 — 띄운 알림이 없으면 null 이다.
  toast: null,
  showToast: (message, variant = "default") => set({ toast: { message, variant } }),
  hideToast: () => set({ toast: null }),
}));
