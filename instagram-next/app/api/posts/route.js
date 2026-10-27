// ~/instagram-next/app/api/posts/route.js
import { posts } from '@/data/posts.js';

export function GET() {
  return Response.json(posts);
}

export async function POST(request) {
  const body = await request.json();
  const { username, postImage } = body;

  if (!username || !postImage) {
    return Response.json(
      { message: 'username과 postImage는 꼭 있어야 해요' },
      { status: 400 },
    );
  }

  const newPost = {
    ...body,
    id: posts.length + 1,
    likeCount: 0,
    commentCount: 0,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);

  return Response.json(newPost, { status: 201 });
}
