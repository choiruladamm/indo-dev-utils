/**
 * eslint-env node
 *
 * @format
 */

import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';

export const metadata = {
  metadataBase: new URL('https://toolkit.adamm.cloud'), // Update with your Vercel domain
  title: {
    template: '%s – @indodev/toolkit',
    default: '@indodev/toolkit – Indonesian Developer Utilities',
  },
  description: 'Type-safe Indonesian data validation and formatting utilities for TypeScript',
  applicationName: '@indodev/toolkit',
  generator: 'Next.js',
  keywords: ['indonesia', 'typescript', 'validation', 'nik', 'phone', 'rupiah', 'utilities'],
  authors: [{ name: 'Choirul Adam', url: 'https://github.com/choiruladamm' }],
  creator: 'Choirul Adam',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolkit.adamm.cloud',
    title: '@indodev/toolkit',
    description: 'Type-safe Indonesian data validation and formatting utilities',
    siteName: '@indodev/toolkit',
    images: [
      {
        url: './opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '@indodev/toolkit - Indonesian Developer Utilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '@indodev/toolkit',
    description: 'Type-safe Indonesian data validation and formatting utilities',
    creator: '@choiruladamm',
  },
};

export default async function RootLayout({ children }) {
  const navbar = (
    <Navbar
      logo={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <b>@indodev/toolkit</b>
        </div>
      }
      logoLink="/docs"
      projectLink="https://github.com/choiruladamm/indo-dev-utils"
    />
  );

  const pageMap = await getPageMap();

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="🇮🇩" />
      <body>
        <Layout
          navbar={navbar}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/choiruladamm/indo-dev-utils/tree/main/docs/content"
          sidebar={{
            toggleButton: true,
          }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
