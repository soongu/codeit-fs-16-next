// ~/instagram-next/proxy.js
export function proxy(request) {
  console.log("proxy:", request.method, request.nextUrl.pathname);
}
