// ~/next-lab/app/p3-13/_components/useNotifications.js
import { useQuery } from '@tanstack/react-query';

async function getNotifications() {
  const response = await fetch('/p3-13/api/notifications');

  if (!response.ok) {
    throw new Error(`알림을 불러오지 못했어요 (${response.status})`);
  }

  return response.json();
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });
}
