import Link from "next/link";
import { PostMetadata } from "@/types";

interface SeriesNavigationProps {
  seriesNav: {
    prev: PostMetadata | null;
    next: PostMetadata | null;
  };
  shouldBeRTL: boolean;
}

export function SeriesNavigation({ seriesNav, shouldBeRTL }: SeriesNavigationProps) {
  if (!seriesNav.prev && !seriesNav.next) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        {shouldBeRTL ? "باقي السلسلة" : "Series Navigation"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {seriesNav.prev ? (
          <Link
            prefetch={false}
            href={`/blog/${seriesNav.prev.slug}`}
            className="group border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="text-sm text-gray-500 mb-1">
              {shouldBeRTL ? "السابق →" : "← Previous"}
            </div>
            <div className="font-semibold group-hover:text-primary transition-colors">
              {seriesNav.prev.frontmatter.title}
            </div>
          </Link>
        ) : (
          <div></div>
        )}
        {seriesNav.next && (
          <Link
            prefetch={false}
            href={`/blog/${seriesNav.next.slug}`}
            className="group border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all text-right"
          >
            <div className="text-sm text-gray-500 mb-1">{shouldBeRTL ? "← التالي" : "Next →"}</div>
            <div className="font-semibold group-hover:text-primary transition-colors">
              {seriesNav.next.frontmatter.title}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
