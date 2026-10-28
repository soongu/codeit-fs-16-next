/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [new URL('https://picsum.photos/seed/**')],
  },
};

export default nextConfig;
