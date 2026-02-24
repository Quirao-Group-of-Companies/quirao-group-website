import type { NextConfig } from 'next';

const supabaseHostname = process.env.SUPABASE_HOSTNAME || '';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: supabaseHostname,
        port: '',
        pathname: '/storage/v1/object/public/strapi-uploads/**',
      },
    ],
  },
  reactCompiler: true,
  transpilePackages: ['@repo/db'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
