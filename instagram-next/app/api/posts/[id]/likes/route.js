// ~/instagram-next/app/api/posts/[id]/likes/route.js
import { posts } from '@/data/posts.js';

function findPost(id) {
  return posts.find((post) => post.id === Number(id));
}

export async function PUT(request, { params }) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // return Response.json({ message: '서버에 문제가 생겼어요' }, { status: 500 });

  const post = findPost(id);

  if (post === undefined) {
    return Response.json(
      { message: `${id}번 게시물은 없어요` },
      { status: 404 },
    );
  }

  if (!post.liked) {
    post.liked = true;
    post.likeCount += 1;
  }

  return Response.json({ liked: post.liked, likeCount: post.likeCount });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const post = findPost(id);

  if (post === undefined) {
    return Response.json(
      { message: `${id}번 게시물은 없어요` },
      { status: 404 },
    );
  }

  if (post.liked) {
    post.liked = false;
    post.likeCount -= 1;
  }

  return Response.json({ liked: post.liked, likeCount: post.likeCount });
}
