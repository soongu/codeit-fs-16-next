// ~/instagram-next/hooks/useMe.js
import { useQuery } from '@tanstack/react-query';
import { authApi, ApiError } from '@/services/api.js';

// 서버가 4xx 로 답했으면 다시 보내도 같은 답이다 — 연결 실패와 5xx 만 세 번까지 다시 보낸다.
function retryOnServerError(failureCount, error) {
  if (error instanceof ApiError && error.status < 500) {
    return false;
  }

  return failureCount < 3;
}

// 지금 로그인한 사람 — 화면은 쿠키를 읽을 수 없으니 서버의 «나는 누구»에 묻는다.
export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: authApi.me,
    retry: retryOnServerError,
  });
}
