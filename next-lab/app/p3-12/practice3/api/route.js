// ~/next-lab/app/p3-12/practice3/api/route.js
let count = 0;

export async function GET() {
  count += 1;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Response.json({ count });
}
