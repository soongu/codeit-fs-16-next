// ~/next-lab/app/p3-14/practice2/api/route.js
const entries = [
  { id: 1, text: "사진 잘 보고 가요!" },
  { id: 2, text: "한강 노을 사진 최고예요" },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return Response.json(entries);
}

export async function POST(request) {
  const { text } = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (text.length > 20) {
    return Response.json({ message: "방명록은 20자까지 남길 수 있어요." }, { status: 400 });
  }

  const entry = { id: entries.length + 1, text };
  entries.push(entry);

  return Response.json(entry, { status: 201 });
}
