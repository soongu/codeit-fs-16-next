// ~/instagram-next/app/api/posts/route.js
import { posts } from "@/data/posts.js";

export function GET() {
  return Response.json(posts);
}
