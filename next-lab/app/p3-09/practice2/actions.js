'use server'

import { refresh } from "next/cache";
import { wishlist } from "./_data/wishlist.js";

export async function wish(id) {

  if (!wishlist.includes(id)) {
    wishlist.push(id);
  }
  refresh();
}

export async function unwish(id) {

  const index = wishlist.indexOf(id);

  if (index !== -1) {
    wishlist.splice(index, 1);
  }
  refresh();
}