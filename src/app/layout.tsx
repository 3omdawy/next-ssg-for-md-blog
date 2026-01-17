/**
 * Copyright (c) 2026 3omdawy (Emad Ashraf)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { ThemeScript } from "@/components/layout/ThemeScript";
import config from "@/config";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: config.site.name,
  description: config.site.description,
  openGraph: {
    title: config.site.name,
    description: config.site.description,
    url: config.site.url,
    siteName: config.site.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: config.site.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.name,
    description: config.site.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isEmbeddable = config.buildMode === "embeddable";

  // Determine direction and language based on config
  const direction = config.language === "ar" ? "rtl" : "ltr";
  const language = config.language === "ar" ? "ar" : config.language === "default" ? "en" : "en";

  return (
    <html
      lang={language}
      dir={direction}
      className={`${cairo.className} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body
        className={`antialiased min-h-screen flex flex-col ${
          isEmbeddable ? "mode-embeddable" : ""
        }`}
      >
        {!isEmbeddable && <Header />}

        <main className="flex-1">{children}</main>

        {!isEmbeddable && (
          <footer className="border-t border-border py-8 mt-12">
            <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-gray-500">
              <p>
                © {new Date().getFullYear()} {config.site.name}. All rights reserved.
              </p>
            </div>
          </footer>
        )}
      </body>
    </html>
  );
}
