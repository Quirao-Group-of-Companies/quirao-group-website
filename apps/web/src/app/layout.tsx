import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { WebVitals } from '@/lib/axiom/client';
import Footer from '../components/layout/Footer.client';
import Header from '../components/layout/Header.client';

export const dynamic = 'force-dynamic'; // Opt into dynamic rendering for this layout and all nested pages/components

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'Quirao Group',
//   description: 'Quirao Group of Companies Website',
// };

export const metadata: Metadata = {
  title: {
    default: 'Quirao Group of Companies',
    template: '%s | QGC',
  },
  description:
    'A diversified conglomerate with businesses in construction, logistics, retail, food service, trading, and e-commerce. Headquartered in Iloilo, QGC drives growth, innovation, and expansion across multiple industries.',
  metadataBase: new URL('https://quiraogroup.com'),
  referrer: 'strict-origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Quirao Group of Companies',
    description:
      'A diversified conglomerate with businesses in construction, logistics, retail, food service, trading, and e-commerce. Headquartered in Iloilo, QGC drives growth, innovation, and expansion across multiple industries.',
    type: 'website',
    locale: 'en_PH',
    siteName: 'Quirao Group of Companies',
    images: [
      {
        url: '/images/logo/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Quirao Group of Companies',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/logo/icon.ico',
    shortcut: '/images/logo/icon.ico',
    apple: '/images/logo/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <WebVitals />
      <body className={`${poppins.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
