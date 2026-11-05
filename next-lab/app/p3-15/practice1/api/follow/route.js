// ~/next-lab/app/p3-15/practice1/api/follow/route.js
import { profile } from '../../_data/profile.js';

export async function PUT() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!profile.following) {
    profile.following = true;
    profile.followerCount += 1;
  }

  return Response.json({
    following: profile.following,
    followerCount: profile.followerCount,
  });
}

export async function DELETE() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (profile.following) {
    profile.following = false;
    profile.followerCount -= 1;
  }

  return Response.json({
    following: profile.following,
    followerCount: profile.followerCount,
  });
}
