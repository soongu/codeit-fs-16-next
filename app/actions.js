// ~/instagram-next/app/actions.js
"use server";

import { posts } from "@/data/posts.js";

export async function likePost(postId) {
  const post = posts.find((item) => item.id === postId);

  if (!post.liked) {
    post.liked = true;
    post.likeCount += 1;
  }
}
