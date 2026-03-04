import { getSariSariManokanPage } from '@/lib/services/strapi-sarisari';

export default async function SariSariManokanTestPage() {
  const data = await getSariSariManokanPage();

  // Helper to render raw JSON safely
  const renderRaw = (section: unknown) => (
    <pre
      style={{
        background: '#f4f4f4',
        padding: '10px',
        fontSize: '12px',
        overflow: 'auto',
        maxHeight: '200px',
      }}
    >
      {JSON.stringify(section, null, 2)}
    </pre>
  );

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      <h1>CMS Connection Test: Paluto Page</h1>
      <p>If you see data below, the API and population logic are working.</p>

      <hr />

      <section>
        <h2>1. Hero Section</h2>
        {data?.hero ? renderRaw(data.hero) : <p style={{ color: 'red' }}>❌ No Hero data found</p>}
      </section>

      <section>
        <h2>2. About Us</h2>
        {data?.aboutUs ? (
          renderRaw(data.aboutUs)
        ) : (
          <p style={{ color: 'red' }}>❌ No About Us data found</p>
        )}
      </section>

      <section>
        <h2>3. Showcase Logo</h2>
        {data?.showcaseLogo ? (
          renderRaw(data.showcaseLogo)
        ) : (
          <p style={{ color: 'red' }}>❌ No Showcase Logo data found</p>
        )}
      </section>

      <section>
        <h2>4. Showcase</h2>
        {data?.showcase ? (
          renderRaw(data.showcase)
        ) : (
          <p style={{ color: 'red' }}>❌ No Showcase data found</p>
        )}
      </section>

      <section>
        <h2>5. Feedback</h2>
        {data?.feedback ? (
          renderRaw(data.feedback)
        ) : (
          <p style={{ color: 'red' }}>❌ No Feedback data found</p>
        )}
      </section>

      <section>
        <h2>6. Contact Us</h2>
        {data?.contactUs ? (
          renderRaw(data.contactUs)
        ) : (
          <p style={{ color: 'red' }}>❌ No Contact Us data found</p>
        )}
      </section>

      <section>
        <h2>7. FAQs</h2>
        {data?.faqs ? renderRaw(data.faqs) : <p style={{ color: 'red' }}>❌ No FAQs data found</p>}
      </section>

      <hr />
      <h2>Full Raw Response</h2>
      {renderRaw(data)}
    </main>
  );
}
