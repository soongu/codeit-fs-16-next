// ~/instagram-next/components/AuthGuard.jsx
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMe } from '@/hooks/useMe.js';
import { ApiError } from '@/services/api.js';

// «나는 누구»가 401(로그인이 필요해요)이면 로그인 화면으로 보낸다 — 보던 주소는 ?next= 에 싣는다.
export default function AuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { error } = useMe();
  const needsLogin = error instanceof ApiError && error.status === 401;

  useEffect(() => {
    if (needsLogin) {
      router.replace(`/login?${new URLSearchParams({ next: pathname })}`);
    }
  }, [needsLogin, router, pathname]);

  // 화면에 그리는 것은 없다 — 지켜보다가 보내기만 한다.
  return null;
}
