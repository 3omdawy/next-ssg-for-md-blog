import { render, screen } from "@testing-library/react";
import { PostCard } from "./PostCard";
import { PostMetadata } from "@/types";
import { describe, it, expect } from "vitest";

const mockPost: PostMetadata = {
  slug: "test-post",
  frontmatter: {
    title: "Test Post",
    date: "2024-01-01",
    tags: ["react", "nextjs"],
    language: "en",
  },
  excerpt: "This is a test excerpt",
  readingTime: 5,
};

describe("PostCard", () => {
  it("renders post title and excerpt", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByRole("heading", { level: 3, name: "Test Post" })).toBeInTheDocument();
    expect(screen.getByText("This is a test excerpt")).toBeInTheDocument();
  });

  it("renders tags properly", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText("#react")).toBeInTheDocument();
    expect(screen.getByText("#nextjs")).toBeInTheDocument();
  });

  it("renders date formatted correctly", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(/January 1, 2024/)).toBeInTheDocument();
  });

  it("renders reading time", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText("5 min read")).toBeInTheDocument();
  });

  it("renders RTL correctly", () => {
    const arabicPost: PostMetadata = {
      ...mockPost,
      frontmatter: {
        ...mockPost.frontmatter,
        language: "ar",
        title: "تجربة",
      },
    };
    render(<PostCard post={arabicPost} />);
    const article = screen.getByRole("article");
    expect(article).toHaveClass("lang-ar");
    expect(article).toHaveAttribute("dir", "rtl");
  });

  it("renders series info if present", () => {
    const seriesPost: PostMetadata = {
      ...mockPost,
      series: "Next.js Series",
      seriesSlug: "nextjs-series",
    };
    render(<PostCard post={seriesPost} />);
    expect(screen.getByText("Next.js Series")).toBeInTheDocument();
  });
});
