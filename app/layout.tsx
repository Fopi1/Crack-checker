import type { Metadata } from "next";
import "./globals.css";

import scandia from "next/font/local";

import { auth } from "@/lib/nextAuth";
import { getLikedGames, getSubscriptions } from "@/lib/utils";
import { Toaster } from "@/shadcn/components";
import { Footer } from "@/shared/components";
import { Header } from "@/shared/components/header";
import { Providers } from "@/shared/components/providers";
import { Background } from "@/shared/components/shared";
import { Overlay } from "@/shared/components/shared/overlay";
import { PanelServer } from "@/shared/components/shared/panel/panelServer";

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
  const session = await auth();

  const [likedGames, subscriptions] = await Promise.all([
    getLikedGames(),
    getSubscriptions(),
  ]);

  return (
    <html lang="en" className={Scandia.className}>
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body className="flex flex-col overflow-x-hidden selection:bg-red-500 text-white">
        <Providers
          session={session}
          likedGames={likedGames}
          subscriptions={subscriptions}
        >
          <Toaster />
          <div>
            <Overlay />
            <Background>
              {process.env.NODE_ENV === "development" ? <PanelServer /> : <></>}
              <Header />
              <main>{children}</main>
              <Footer />
            </Background>
          </div>
        </Providers>
      </body>
    </html>
  );
}
