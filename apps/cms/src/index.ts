// apps/cms/src/index.ts
export default {
  register() {
    // We cast 'err' to 'any' or 'NodeJS.ErrnoException' to access .code
    process.on('uncaughtException', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EBUSY') {
        console.warn('Recovered from EBUSY file-lock error. Strapi will continue running.');
        return;
      }

      // For any other error, log it and exit
      console.error('Uncaught Exception:', err);
      process.exit(1);
    });
  },

  bootstrap() {},
};
