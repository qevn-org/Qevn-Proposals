import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans'
});

export const metadata: Metadata = {
  title: 'QEVN Proposal Studio — Proposal Operating System',
  description:
    'Internal proposal operating system for creating, customizing, managing, previewing, and exporting 13-page client proposals.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '64x64', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans`}>
      <body className="min-h-screen bg-[#FAFAFA] text-neutral-900 antialiased selection:bg-[#A3FF38] selection:text-black">
        {children}
      </body>
    </html>
  );
}
