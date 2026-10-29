// ~/instagram-next/proxy.js
import { NextResponse } from 'next/server';
import { profiles } from '@/data/profiles.js';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname !== pathname.toLowerCase()) {
    return NextResponse.redirect(new URL(pathname.toLowerCase(), request.url));
  }

  if (pathname === '/login' || pathname.includes('.')) {
    return;
  }

  const username = pathname.split('/')[1];
  const profile = profiles.find((item) => item.username === username);

  if (profile === undefined) {
    return NextResponse.rewrite(new URL('/_not-found', request.url), {
      status: 404,
    });
  }
}

export const config = {
  matcher: ['/:username', '/:username/saved'],
};
