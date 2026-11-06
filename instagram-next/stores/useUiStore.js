// ~/instagram-next/stores/useUiStore.js
import { create } from 'zustand';

// 화면 여러 곳이 함께 보는 값 — 서버와는 상관없다.
export const useUiStore = create((set) => ({
  isCreateFeedOpen: false,
  openCreateFeed: () => set({ isCreateFeedOpen: true }),
  closeCreateFeed: () => set({ isCreateFeedOpen: false }),

  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),
}));
