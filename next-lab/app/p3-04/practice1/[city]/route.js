// ~/next-lab/app/p3-04/practice1/[city]/route.js
const weather = {
  seoul: { temperature: 23, sky: '맑음' },
  busan: { temperature: 25, sky: '흐림' },
  gwangju: { temperature: 24, sky: '비' },
};

export async function GET(request, { params }) {
  const { city } = await params;
  const today = weather[city];

  if (today === undefined) {
    return Response.json(
      { message: `${city} 날씨는 아직 몰라요` },
      { status: 404 },
    );
  }

  return Response.json({ city, ...today });
}
