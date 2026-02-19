import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import { WebVitals } from "@/lib/axiom/client";

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quirao Group',
  description: 'Quirao Group of Companies Website',
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
        {/* TODO: Add footer */}
      </body>
    </html>
  );
}
