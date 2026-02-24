'use client';
import { useEffect } from 'react';
import { logger } from '@/lib/axiom/client';

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    logger.error('UI_CRASH', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
    logger.flush();
  }, [error]);

  return <div>Something went wrong. The error has been logged.</div>;
}
