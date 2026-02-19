'use client';
import { AxiomJSTransport, Logger } from '@axiomhq/logging';
import { nextJsFormatters } from '@axiomhq/nextjs/client';
import { createUseLogger, createWebVitalsComponent } from '@axiomhq/react';
import axiomClient from '@/lib/axiom/axiom';

const dataset = process.env.NEXT_PUBLIC_AXIOM_DATASET;
if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_AXIOM_DATASET environment variable');
}
export const logger = new Logger({
  transports: [new AxiomJSTransport({ axiom: axiomClient, dataset: dataset })],
  formatters: nextJsFormatters,
});

const useLogger = createUseLogger(logger);
const WebVitals = createWebVitalsComponent(logger);

export { useLogger, WebVitals };
