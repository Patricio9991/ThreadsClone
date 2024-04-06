/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors: true
    },
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
      },
    images:{
        remotePatterns: [{
            protocol: 'https',
            hostname: 'img.clerk.com'
        }]
    }
};

export default nextConfig;
