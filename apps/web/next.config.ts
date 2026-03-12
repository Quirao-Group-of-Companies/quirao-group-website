import type { NextConfig } from 'next';

const supabaseHostname = process.env.SUPABASE_HOSTNAME || '';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(supabaseHostname
        ? [
            {
              protocol: 'https' as const,
              hostname: supabaseHostname,
              port: '',
              pathname: '/**',
            },
          ]
        : []),
      {
        protocol: 'https',
        hostname: 'dibqbzpgdufhfgvetqhs.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
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
  output: 'standalone',
};

export default nextConfig;
