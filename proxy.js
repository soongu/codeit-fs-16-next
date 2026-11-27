// ~/instagram-next/proxy.js
import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname !== pathname.toLowerCase()) {
    return NextResponse.redirect(new URL(pathname.toLowerCase(), request.url));
  }

  if (pathname === "/login" || pathname === "/signup" || pathname.includes(".")) {
    return;
  }

  // 로그인 쿠키가 없으면 페이지를 그리기 전에 로그인 화면으로 보낸다 — 토큰이 살아 있는지는 묻지 않는다.
  if (!request.cookies.has("accessToken")) {
    const loginUrl = new URL("/login", request.url);
    // 보던 주소는 경로와 쿼리 문자열을 함께 싣는다 - 태그 페이지는 어느 태그인지가 ?q= 에 있다.
    loginUrl.searchParams.set("next", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/", "/:username", "/:username/saved", "/p/:id", "/explore/search/keyword"],
};
