// apps/web/app/db-test/page.tsx
import { type Article, articles, db } from '@repo/db';
import { eq, sql } from 'drizzle-orm';
// import z from 'zod';

export const dynamic = 'force-dynamic'; // Ensure it doesn't cache the test

export default async function DbTestPage() {
  let status = 'Checking...';
  let data: Article[] = [];
  let error: string | null = null;
  try {
    // 1. Test Raw Connection (Simple Ping)
    // This checks if the DB is reachable
    await db.execute(sql`SELECT 1`);

    // 2. Test Drizzle Query (Fetch Articles)
    // This checks if your schema mapping is correct
    data = await db.select().from(articles).where(eq(articles.slug, 'news-update-633'));

    status = 'Successfully Connected!';
  } catch (e: unknown) {
    status = 'Connection Failed';
    error = e instanceof Error ? e.message : 'Unknown error';
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Drizzle + Supabase Connection Test</h1>

      <div
        style={{
          padding: '1rem',
          backgroundColor: error ? '#fee2e2' : '#dcfce7',
          borderRadius: '8px',
          marginBottom: '1rem',
          color: '#000000',
        }}
      >
        <strong>Status:</strong> {status}
      </div>

      {error && (
        <div style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
          <strong>Error Details:</strong>
          <p>{error}</p>
          <p>
            <em>Check if DATABASE_URL is correctly set in your root .env</em>
          </p>
        </div>
      )}

      {!error && (
        <div>
          <h2>Data Preview (First 5 Articles):</h2>
          <pre style={{ background: '#ffffff', padding: '1rem', color: '#000000' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
          {data.length === 0 && <p>Connection works, but the "articles" table is empty.</p>}
        </div>
      )}
    </main>
  );
}
