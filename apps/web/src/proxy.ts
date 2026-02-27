import { transformMiddlewareRequest } from '@axiomhq/nextjs';
import { type NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/axiom/server';

export async function proxy(request: NextRequest) {
  // --- 1. Axiom Logging Logic ---
  logger.info(...transformMiddlewareRequest(request));

  // --- 2. CSP Setup Logic ---
  /**
   * TODO: DEPLOYMENT CHECKLIST
   * 1. ENVIRONMENT VARIABLES: Ensure NEXT_PUBLIC_STRAPI_URL and SUPABASE_URL
   * are set in your production environment (Dokploy).
   * * 2. PROTOCOL CHECK: In production, ensure all whitelist URLs use 'https://'.
   * CSP will block 'http://' calls from an 'https://' site.
   * * 3. SUBDOMAINS: If using Supabase Storage, ensure the wildcard (*.supabase.co)
   * is correct for your specific region/project.
   */
  const isDev = process.env.NODE_ENV === 'development';
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const AXIOM_URL = 'https://api.axiom.co';
  const RESEND_URL = 'https://api.resend.com';

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: ${STRAPI_URL} ${SUPABASE_URL} https://*.supabase.co;
    font-src 'self' data:;
    connect-src 'self' ${SUPABASE_URL} ${AXIOM_URL} ${RESEND_URL} https://*.supabase.co;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
  return response;
}

export const config = {
  matcher: [
    /*
     * Combined Matcher: Matches all paths except static assets and internal Next.js files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
