import type { Metadata } from "next";
import scandia from "next/font/local";
import { Background, Footer, Header } from "@/shared/components/shared";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={Scandia.className}>
      <body className="flex flex-col h-screen overflow-x-hidden selection:bg-red-500 text-white">
        <Background />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
