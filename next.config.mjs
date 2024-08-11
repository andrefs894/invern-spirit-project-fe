/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    reactStrictMode: true,
    images: {
      domains: ["blue-heart-93dc.manuelfesantos.workers.dev"],
      unoptimized: true,
    },
    output: 'export',
};

export default nextConfig;
