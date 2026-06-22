import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "WorkSync",
  description: "BY VARSHITH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className=" flex flex-col bg-background text-foreground min-h-screen">
        <header className="border-b border-(--border) bg-(--surface)/90 backdrop-blur ">
          <div className="flex justify-between p-4 mx-auto w-full items-center">
            <Link href={"/"} className="text-sm font-semibold tracking-wide">WorkSync</Link>
            <nav>
              <Link href={"/dashboard"} className="text-sm text-(--muted-foreground)">Dashboard</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
        {children}
        </main>
        </body>
    </html>
  );
}
