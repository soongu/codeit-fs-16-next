// ~/next-lab/app/p3-12/practice1/useTrending.js
import { useEffect, useState } from 'react';

export function useTrending() {
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/p3-12/practice1/api');
      setTrending(await response.json());
    };

    load();
    const timer = setInterval(load, 10000);

    return () => clearInterval(timer);
  }, []);

  return trending;
}
