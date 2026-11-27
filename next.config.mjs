// ~/instagram-next/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // /direct 로 오면 대화방 목록 화면 주소로 보낸다 - 주소창의 주소가 바뀐다.
  async redirects() {
    return [{ source: "/direct", destination: "/direct/inbox", permanent: false }];
  },
  async rewrites() {
    return [
      {
        source: "/api/v2/posts/:path*",
        destination: `${process.env.API_URL}/api/v2/posts/:path*`,
      },
      {
        source: "/api/v2/auth/:path*",
        destination: `${process.env.API_URL}/api/v2/auth/:path*`,
      },
      {
        source: "/api/v2/uploads/:path*",
        destination: `${process.env.API_URL}/api/v2/uploads/:path*`,
      },
      {
        source: "/api/v2/hashtags/:path*",
        destination: `${process.env.API_URL}/api/v2/hashtags/:path*`,
      },
      {
        source: "/api/v2/profiles/:path*",
        destination: `${process.env.API_URL}/api/v2/profiles/:path*`,
      },
      {
        source: "/api/v2/members/:path*",
        destination: `${process.env.API_URL}/api/v2/members/:path*`,
      },
      {
        source: "/api/v2/conversations/:path*",
        destination: `${process.env.API_URL}/api/v2/conversations/:path*`,
      },
      {
        source: "/api/v2/notifications/:path*",
        destination: `${process.env.API_URL}/api/v2/notifications/:path*`,
      },
      {
        // 실시간 연결 - 끝에 / 가 없는 주소로 받아 백엔드에는 / 를 붙여 넘긴다.
        source: "/socket.io",
        destination: `${process.env.API_URL}/socket.io/`,
      },
      {
        source: "/uploads/:path*",
        destination: `${process.env.API_URL}/uploads/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [new URL("https://picsum.photos/seed/**")],
  },
};

export default nextConfig;
