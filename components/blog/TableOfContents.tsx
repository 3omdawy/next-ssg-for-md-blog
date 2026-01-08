"use client";

/**
 * TableOfContents Component
 * Renders a sticky navigation for article headings
 */

import React, { useEffect, useState } from "react";
import type { TableOfContentsItem } from "@/types";
import { isArabicText } from "@/lib/markdown";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const isArabic = items.length > 0 && isArabicText(items[0].text);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto scrollbar-hide">
      <h2 className="text-sm font-semibold mb-4 uppercase text-gray-500 tracking-wider">
        {isArabic ? "العناوين" : "On this page"}
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingInlineStart: `${(item.level - 2) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={`block transition-colors duration-200 border-is-2 ps-4 -ms-[2px] ${
                activeId === item.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-500 hover:text-foreground hover:border-gray-300"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                });
                setActiveId(item.id);
                // Update URL hash without scroll
                history.pushState(null, "", `#${item.id}`);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
