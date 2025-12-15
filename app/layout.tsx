import { LayoutProvider } from '@/layout/context/layoutcontext';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import '@/styles/demo/Demos.scss';
import '@/styles/layout/layout.scss';

import Providers from '@/app/api/utility/providers';    /*QueryClientProvider*/
import Layout from '@/layout/pubLayout';
import { Suspense } from 'react'
import { Metadata } from 'next';
import { ConfirmDialog } from 'primereact/confirmdialog';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'i-CCOLi 관리자',
  description: '',
  robots: { index: false, follow: false },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <link
        id="theme-link"
        href={`/theme/theme-light/indigo/theme.css`}
        rel="stylesheet"
      ></link>
    </head>
    <body>
    <PrimeReactProvider>
      <Providers>
        <LayoutProvider>
          <Suspense>
            <Layout>
              {children}
              <ConfirmDialog />
            </Layout>
          </Suspense>
        </LayoutProvider>
      </Providers>
    </PrimeReactProvider>
    </body>
    </html>
  );
}
