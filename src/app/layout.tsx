/**
 * Copyright (c) 2026 3omdawy (Emad Ashraf)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Metadata } from "next";
import { Cairo, Montserrat } from "next/font/google";
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
        url: "/blog-image.jpg",
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
    images: ["/blog-image.jpg"],
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
      className={`${montserrat.variable} ${cairo.variable} font-sans`}
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
          <footer className="border-t border-border py-12 mt-20">
            <div className="container mx-auto px-4 max-w-6xl text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Made with ❤️ by{" "}
                <a
                  href="https://github.com/3omdawy/next-ssg-for-md-blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline text-primary"
                >
                  next-ssg-for-md-blog
                </a>
              </p>
            </div>
          </footer>
        )}
      </body>
    </html>
  );
}
