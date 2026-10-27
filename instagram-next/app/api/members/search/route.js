// ~/instagram-next/app/api/members/search/route.js
import { profiles } from '@/data/profiles.js';

export function GET(request) {
  const keyword = request.nextUrl.searchParams.get('keyword');

  if (!keyword) {
    return Response.json([]);
  }

  const found = profiles.filter((item) => item.username.includes(keyword));

  return Response.json(found);
}
