// ~/next-lab/app/p3-14/homework2/api/route.js
import { profile } from "../_data/profile.js";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json(profile);
}

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  profile.followerCount += 1;

  return Response.json(profile);
}
