// ~/next-lab/app/p3-12/practice1/api/route.js
const keywords = [
  '한강 노을',
  '크루아상',
  '농구 코트',
  '캠핑 의자',
  '필름 카메라',
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const turn = Math.floor(Date.now() / 10000) % keywords.length;

  return Response.json({
    checkedAt: new Date().toLocaleTimeString('ko-KR'),
    keywords: [...keywords.slice(turn), ...keywords.slice(0, turn)],
  });
}
