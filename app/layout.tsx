import type { Metadata } from "next";
import { Azeret_Mono } from "next/font/google";
import "./globals.css";

const azer = Azeret_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christian Keogh"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={azer.className}>{children}</body>
    </html>
  );
}
