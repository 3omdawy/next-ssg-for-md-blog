import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import config from "@/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: config.site.name,
  description: config.site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isEmbeddable = config.buildMode === "embeddable";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {!isEmbeddable && <Header />}

        <main className="flex-1">{children}</main>

        {!isEmbeddable && (
          <footer className="border-t border-border py-8 mt-12">
            <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-gray-500">
              <p>
                © {new Date().getFullYear()} {config.site.name}. All rights
                reserved.
              </p>
            </div>
          </footer>
        )}
      </body>
    </html>
  );
}
