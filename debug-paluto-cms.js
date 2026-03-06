const qs = require('qs');
require('dotenv').config({ path: '.env.local' }); // Load from .env.local where Next.js stores keys

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function debugShowcaseData() {
  console.log('--- Paluto CMS Debugger ---');
  console.log('Target URL:', STRAPI_URL);
  
  if (!STRAPI_TOKEN) {
    console.error('Error: STRAPI_API_TOKEN is not defined in your environment.');
    return;
  }

  const query = qs.stringify(
    {
      populate: {
        showcaseLogo: {
          populate: '*',
        },
        showcase: {
          populate: '*',
        },
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const res = await fetch(`${STRAPI_URL}/api/paluto-page?${query}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error(`HTTP Error: ${res.status}`);
      const err = await res.json();
      console.error(JSON.stringify(err, null, 2));
      return;
    }

    const json = await res.json();
    const data = json.data;

    console.log('\n--- SHOWCASE LOGO ---');
    console.log(JSON.stringify(data.showcaseLogo, null, 2));

    console.log('\n--- SHOWCASE ITEMS (DISHES) ---');
    if (data.showcase && data.showcase.length > 0) {
      console.log(`Found ${data.showcase.length} item(s):`);
      data.showcase.forEach((item, index) => {
        console.log(`\n[Item ${index + 1}]`);
        console.log(`- ID: ${item.id}`);
        console.log(`- Title: "${item.title}"`);
        console.log(`- Image URL: ${item.image?.url || 'MISSING'}`);
        if (!item.image?.url) {
            console.log('  WARNING: This item has no image and might not display correctly.');
        }
      });
    } else {
      console.log('No showcase items found in the "showcase" field.');
    }

  } catch (error) {
    console.error('Fetch Error:', error.message);
  }
}

debugShowcaseData();
