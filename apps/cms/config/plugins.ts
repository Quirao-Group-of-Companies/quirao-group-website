import type { Core } from '@strapi/strapi';

export default (_: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'local',
    },
  },
});