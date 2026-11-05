// ~/next-lab/app/p3-16/practice1/api/route.js
const notices = [
  { id: 12, title: '10월 정기 점검 안내' },
  { id: 11, title: '새 필터 3종이 추가됐어요' },
  { id: 10, title: '개인정보 처리방침 변경 안내' },
  { id: 9, title: '추석 연휴 고객센터 운영 시간' },
  { id: 8, title: '스토리 보관 기간이 늘어났어요' },
  { id: 7, title: '앱 3.2 버전 업데이트 안내' },
  { id: 6, title: '댓글 고정 기능이 생겼어요' },
  { id: 5, title: '8월 정기 점검 안내' },
  { id: 4, title: '여름 이벤트 당첨자 발표' },
  { id: 3, title: '다크 모드를 지원해요' },
  { id: 2, title: '커뮤니티 가이드라인 안내' },
  { id: 1, title: '서비스 오픈 안내' },
];

const PER_PAGE = 4;

export async function GET(request) {
  const cursor = Number(request.nextUrl.searchParams.get('cursor'));
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 커서가 오면 «그 공지보다 번호가 작은 것»부터다. 최신 공지가 맨 앞에 있다.
  const rest = cursor
    ? notices.filter((notice) => notice.id < cursor)
    : notices;
  const page = rest.slice(0, PER_PAGE + 1);

  return Response.json({
    items: page.slice(0, PER_PAGE),
    hasNext: page.length > PER_PAGE,
  });
}
