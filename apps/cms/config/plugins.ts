import type { Core } from '@strapi/strapi';

export default ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-supabase',
      providerOptions: {
        apiUrl: env('NEXT_PUBLIC_SUPABASE_URL'),
        apiKey: env('SUPABASE_SERVICE_ROLE_KEY'),
        bucket: env('SUPABASE_BUCKET_NAME'),
      },
    },
  },
});