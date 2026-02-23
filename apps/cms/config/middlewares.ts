export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://*.supabase.co', 'https://*.supabase.in'],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://*.supabase.co',
            'https://*.supabase.in',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formidable: {
        keepExtensions: true,
        maxFileSize: 200 * 1024 * 1024,
        hashAlgorithm: false,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
