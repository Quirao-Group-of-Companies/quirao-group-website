import { AxiomJSTransport, Logger } from '@axiomhq/logging';
import { createAxiomRouteHandler, nextJsFormatters } from '@axiomhq/nextjs';
import axiomClient from '@/lib/axiom/axiom';

const dataset = process.env.NEXT_PUBLIC_AXIOM_DATASET;
if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_AXIOM_DATASET environment variable');
}
export const logger = new Logger({
  transports: [new AxiomJSTransport({ axiom: axiomClient, dataset: dataset })],
  formatters: nextJsFormatters,
});

export const withAxiom = createAxiomRouteHandler(logger);
