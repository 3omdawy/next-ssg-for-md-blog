import Link from "next/link";
import config from "@/config";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <Link
          prefetch={false}
          href="/"
          className="text-xl font-bold hover:text-primary transition-colors"
        >
          {config.site.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link prefetch={false} href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link prefetch={false} href="/series" className="hover:text-primary transition-colors">
              Series
            </Link>
            <Link prefetch={false} href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
