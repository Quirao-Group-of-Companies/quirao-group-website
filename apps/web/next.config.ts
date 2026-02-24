import type { NextConfig } from 'next';

const supabaseHostname = process.env.SUPABASE_HOSTNAME || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/^https?:\/\//, '') || '',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
