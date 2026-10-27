// ~/instagram-next/app/api/profiles/[username]/route.js
import { profiles } from '@/data/profiles.js';

export async function GET(request, { params }) {
  const { username } = await params;
  const profile = profiles.find((item) => item.username === username);

  if (profile === undefined) {
    return Response.json({ message: '그런 사람은 없어요' }, { status: 404 });
  }

  return Response.json(profile);
}
