// ~/instagram-next/app/(auth)/_components/useDuplicateCheck.js
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@/hooks/useDebouncedValue.js';
import { authApi } from '@/services/api.js';

// 규칙을 통과한 값이면 서버에 «누가 이미 쓰고 있나» 를 묻는다 — 입력이 0.5초 멈춘 뒤에만.
export function useDuplicateCheck(type, value, valid) {
  const settled = useDebouncedValue(value, 500);
  const { data } = useQuery({
    queryKey: ["check-duplicate", type, settled],
    queryFn: () => authApi.checkDuplicate(type, settled),
    enabled: valid && settled === value,
  });

  // 아직 치는 중이면 물어본 값과 지금 값이 달라서, 답이 있어도 지금 값의 답이 아니다.
  return settled === value ? data : undefined;
}
