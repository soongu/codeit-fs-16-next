// ~/instagram-next/hooks/useMe.js
import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/services/api.js';

// 지금 로그인한 사람 — 화면은 쿠키를 읽을 수 없으니 서버의 «나는 누구»에 묻는다.
export function useMe() {
  return useQuery({ queryKey: ['me'], queryFn: authApi.me });
}
