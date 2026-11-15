// ~/instagram-next/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
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
    ];
  },
  images: {
    remotePatterns: [new URL("https://picsum.photos/seed/**")],
  },
};

export default nextConfig;
