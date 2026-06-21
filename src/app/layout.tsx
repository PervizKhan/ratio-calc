// app/layout.tsx - Clean meta tags
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pakeza™ Detergent Calculator',
  description: 'Calculate ingredient ratios for Pakeza washing powder formulas',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#0f766e',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Pakeza Calculator',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}