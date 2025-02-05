import type { Metadata } from "next";
import './globals.css';

import scandia from 'next/font/local';
import { cookies } from 'next/headers';

import { verifyAccessToken } from '@/lib/jwt';
import { Footer } from '@/shared/components';
import { Header } from '@/shared/components/header';
import { Providers } from '@/shared/components/providers';
import { Background } from '@/shared/components/shared';

const Scandia = scandia({
  src: [
    {
      path: "../public/fonts/Scandia-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Scandia-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Scandia-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "CrackChecker - Crack Status, Game release calendar",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("accessToken")?.value;
  const payload = token ? verifyAccessToken(token) : null;

  const lastNavLinkData = {
    href: payload ? "/profile" : "/login",
    text: payload ? payload.name : "log in",
  };

  return (
    <html lang="en" className={Scandia.className}>
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body className="flex flex-col overflow-x-hidden selection:bg-red-500 text-white">
        <Providers>
          <Background />
          <Header lastNavLinkData={lastNavLinkData} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
