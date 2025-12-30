import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import RegisterSW from './RegisterSW';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MovieExplorer - Discover Amazing Movies',
  description: 'Browse, search, and explore your favorite movies',

  /* 🔥 PWA Builder essentials */
  manifest: '/manifest.json',
  themeColor: '#000000',

  /* Optional but recommended */
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MovieExplorer',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <RegisterSW />
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
