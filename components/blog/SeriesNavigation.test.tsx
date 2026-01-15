import { render, screen } from "@testing-library/react";
import { SeriesNavigation } from "./SeriesNavigation";
import { PostMetadata } from "@/types";
import { describe, it, expect } from "vitest";

const mockPost: PostMetadata = {
  slug: "test-post",
  frontmatter: {
    title: "Test Post",
    date: "2024-01-01",
  },
};

describe("SeriesNavigation", () => {
  it("renders nothing when no prev or next", () => {
    const { container } = render(
      <SeriesNavigation seriesNav={{ prev: null, next: null }} shouldBeRTL={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders prev link correctly", () => {
    const prevPost = {
      ...mockPost,
      slug: "prev-post",
      frontmatter: { ...mockPost.frontmatter, title: "Previous Post" },
    };
    render(<SeriesNavigation seriesNav={{ prev: prevPost, next: null }} shouldBeRTL={false} />);
    expect(screen.getByText("Previous Post")).toBeInTheDocument();
    expect(screen.getByText("← Previous")).toBeInTheDocument();
  });

  it("renders next link correctly", () => {
    const nextPost = {
      ...mockPost,
      slug: "next-post",
      frontmatter: { ...mockPost.frontmatter, title: "Next Post" },
    };
    render(<SeriesNavigation seriesNav={{ prev: null, next: nextPost }} shouldBeRTL={false} />);
    expect(screen.getByText("Next Post")).toBeInTheDocument();
    expect(screen.getByText("Next →")).toBeInTheDocument();
  });

  it("renders both links correctly", () => {
    const prevPost = {
      ...mockPost,
      slug: "prev-post",
      frontmatter: { ...mockPost.frontmatter, title: "Previous Post" },
    };
    const nextPost = {
      ...mockPost,
      slug: "next-post",
      frontmatter: { ...mockPost.frontmatter, title: "Next Post" },
    };
    render(<SeriesNavigation seriesNav={{ prev: prevPost, next: nextPost }} shouldBeRTL={false} />);
    expect(screen.getByText("Previous Post")).toBeInTheDocument();
    expect(screen.getByText("Next Post")).toBeInTheDocument();
  });

  it("handles RTL correctly", () => {
    const nextPost = {
      ...mockPost,
      slug: "next-post",
      frontmatter: { ...mockPost.frontmatter, title: "Next Post" },
    };
    render(<SeriesNavigation seriesNav={{ prev: null, next: nextPost }} shouldBeRTL={true} />);
    expect(screen.getByText("باقي السلسلة")).toBeInTheDocument();
    expect(screen.getByText("← التالي")).toBeInTheDocument();
  });
});
