import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({});

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-supabase',
      providerOptions: {
        apiUrl: env('NEXT_PUBLIC_SUPABASE_URL'), // Supabase URL
        apiKey: env('SUPABASE_SERVICE_ROLE_KEY'), // Use Service Role Key for upload permissions
        bucket: 'strapi-uploads',
      },
    },
  },
});

export default config;
