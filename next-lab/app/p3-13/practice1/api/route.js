// ~/next-lab/app/p3-13/practice1/api/route.js
const entries = [
  { id: 1, text: '사진 잘 보고 가요!' },
  { id: 2, text: '한강 노을 사진 최고예요' },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return Response.json(entries);
}

export async function POST(request) {
  const { text } = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const entry = { id: entries.length + 1, text };
  entries.push(entry);

  return Response.json(entry, { status: 201 });
}
