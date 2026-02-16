import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';

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
      <body className={`${poppins.className} antialiased`}>
        <Header />
        {children}
        {/* TODO: Add footer */}
      </body>
    </html>
  );
}
