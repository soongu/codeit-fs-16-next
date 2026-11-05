// ~/next-lab/app/p3-14/api/members/route.js
import { members } from '../../_data/members.js';

export async function GET(request) {
  const keyword = request.nextUrl.searchParams.get('keyword');
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const found = members.filter((member) => member.username.includes(keyword));

  return Response.json(found);
}
