/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.unsplash.com"],
    },
    experimental: {
        serverActions: true,
    },
    reactStrictMode: false,
};

export default nextConfig;
