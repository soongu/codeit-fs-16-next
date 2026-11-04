// ~/next-lab/app/p3-14/_components/useNotifications.js
import { useQuery } from '@tanstack/react-query';

async function getNotifications() {
  const response = await fetch('/p3-14/api/notifications');

  if (!response.ok) {
    throw new Error(`알림을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    staleTime: 30 * 1000,
    retry: 1
  });
}
