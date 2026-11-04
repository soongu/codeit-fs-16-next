// ~/next-lab/app/p3-12/_components/useNotifications.js
import { useEffect, useState } from 'react';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/p3-12/api/notifications');

        if (!response.ok) {
          throw new Error(`알림을 불러오지 못했어요 (${response.status})`);
        }

        setNotifications(await response.json());
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return { notifications, isLoading, error };
}
