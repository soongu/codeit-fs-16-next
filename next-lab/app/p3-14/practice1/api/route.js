// ~/next-lab/app/p3-14/practice1/api/route.js
const temperatures = { seoul: 18, busan: 21, jeju: 23 };

export async function GET(request) {
  const city = request.nextUrl.searchParams.get('city');
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!(city in temperatures)) {
    return Response.json(
      { message: `${city}의 날씨는 없어요` },
      { status: 404 },
    );
  }

  return Response.json({ city, temperature: temperatures[city] });
}
