// ~/instagram-next/next.config.mjs
/**@type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return [
      {
        source: '/api/posts/:path*',
        destination: `${process.env.API_URL}/api/posts/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [new URL('https://picsum.photos/seed/**')],
  },
};

export default nextConfig;
