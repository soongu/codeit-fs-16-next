// ~/next-lab/app/p3-18/practice1/useCartStore.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => ({ items: [...state.items, product] })),
  
  // 요구사항 8
  // addItem: (product) => set((state) => {
  //   state.items.push(product);
  //   return { items: state.items };
  // }),
}));
