// ~/instagram-next/app/actions.js
'use server';

import { refresh } from 'next/cache';
import { posts } from '@/data/posts.js';

export async function likePost(postId) {
  const post = posts.find((item) => item.id === postId);

  if (!post.liked) {
    post.liked = true;
    post.likeCount += 1;
  }

  refresh();
}

export async function unlikePost(postId) {
  const post = posts.find((item) => item.id === postId);

  if (post.liked) {
    post.liked = false;
    post.likeCount -= 1;
  }

  refresh();
}
