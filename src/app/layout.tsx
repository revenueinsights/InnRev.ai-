import { ZodError } from 'zod';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { envSchema } from '@/config/env.config';
import { Toaster } from '@/components/ui/toaster';
import { TanstackProvider } from '@/providers/tanstack-provider';

import './globals.css';
import { Header } from './_components/header';
import { Sidebar } from './_components/sidebar';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Innrev.ai',
  description: 'Innrev.ai',
};

export default function RootLayout({ children }: WithChildren) {
  try {
    envSchema.parse(process.env);

    return (
      <html lang="en">
        <body className={plusJakartaSans.className}>
          <TanstackProvider>
            <main className="min-w-full min-h-svh p-4 relative z-30">
              <Header />
              <section className="main-section">
                <Sidebar />
                <div className="pr-1.5 grid-screen-container hide-scrollbar">
                  {children}
                </div>
              </section>
            </main>
            <Toaster />
          </TanstackProvider>
        </body>
      </html>
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return (
        <div>
          <h1>Invalid env variables</h1>
          <pre>{JSON.stringify(err, null, 2)}</pre>
        </div>
      );
    }

    return <h1>Something went wrong</h1>;
  }
}
