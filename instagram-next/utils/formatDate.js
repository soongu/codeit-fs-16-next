// ~/instagram-next/utils/formatDate.js
// 서버가 보낸 시각을 「10월 15일」 같은 날짜로 바꿔요.
export function formatDate(createdAt) {
  return new Date(createdAt).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  });
}
