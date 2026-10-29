// ~/instagram-next/app/actions.js
'use server';

import { revalidatePath } from 'next/cache';
import { posts } from '@/data/posts.js';

function findPost(postId) {
  const post = posts.find((item) => item.id === postId);

  if (post === undefined) {
    throw new Error(`${postId}번 게시물은 없어요`);
  }

  return post;
}

export async function likePost(postId) {
  const post = findPost(postId);

  if (!post.liked) {
    post.liked = true;
    post.likeCount += 1;
  }

  revalidatePath('/');
}

export async function unlikePost(postId) {
  const post = findPost(postId);

  if (post.liked) {
    post.liked = false;
    post.likeCount -= 1;
  }

  revalidatePath('/');
}
