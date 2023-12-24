import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Viewport } from 'next';
import { ReactNode } from 'react';
import { KumaRegistry } from '@kuma-ui/next-plugin/registry';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Japan Population Viewer',
  description: '都道府県別の総人口推移グラフをみるやつ',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" style={{ overflowY: 'scroll' }}>
      <body>
        <KumaRegistry>{children}</KumaRegistry>
      </body>
    </html>
  );
}
