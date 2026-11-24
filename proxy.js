// ~/instagram-next/proxy.js
import { NextResponse } from "next/server";
import { profiles } from "@/data/profiles.js";

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

  // 피드는 사용자 이름이 든 주소가 아니다 — 아래 프로필 목록 확인을 건너뛴다.
  if (pathname === "/") {
    return;
  }

  // 게시물 주소(/p/9)도 사용자 이름이 든 주소가 아니다 — 프로필 목록 확인을 건너뛴다.
  if (pathname.startsWith("/p/")) {
    return;
  }

  // 태그 페이지(/explore/search/keyword)도 사용자 이름이 든 주소가 아니다 - 프로필 목록 확인을 건너뛴다.
  if (pathname === "/explore/search/keyword") {
    return;
  }

  const username = pathname.split("/")[1];
  const profile = profiles.find((item) => item.username === username);

  if (profile === undefined) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }
}

export const config = {
  matcher: ["/", "/:username", "/:username/saved", "/p/:id", "/explore/search/keyword"],
};
