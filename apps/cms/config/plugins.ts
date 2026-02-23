// import type { Core } from '@strapi/strapi';

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-upload-supabase-provider',
      providerOptions: {
        apiUrl: env('NEXT_PUBLIC_SUPABASE_URL'),
        apiKey: env('SUPABASE_SERVICE_ROLE_KEY'),
        bucket: env('SUPABASE_BUCKET_NAME'),
      },
    },
  },
});
