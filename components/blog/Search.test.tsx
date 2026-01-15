import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./Search";
import { PostMetadata } from "@/types";
import { describe, it, expect } from "vitest";

const mockPosts: PostMetadata[] = [
  {
    slug: "post-1",
    frontmatter: { title: "First Post", date: "2024-01-01", description: "This is the first post" },
  },
  {
    slug: "post-2",
    frontmatter: {
      title: "Second Post",
      date: "2024-01-02",
      description: "This is the second post",
    },
  },
];

describe("Search", () => {
  it("renders search input", () => {
    render(<Search posts={mockPosts} />);
    expect(screen.getByPlaceholderText("Search posts...")).toBeInTheDocument();
  });

  it("shows results when typing", () => {
    render(<Search posts={mockPosts} />);
    const input = screen.getByPlaceholderText("Search posts...");

    // Changing input updates state which triggers rerender with results
    fireEvent.change(input, { target: { value: "First" } });

    // Fuse.js is sync, so results should appear immediately
    expect(screen.getByText("First Post")).toBeInTheDocument();
    // Use queryByText for elements that shouldn't be there
    expect(screen.queryByText("Second Post")).not.toBeInTheDocument();
  });

  it("shows no results message", () => {
    render(<Search posts={mockPosts} />);
    const input = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(input, { target: { value: "Nonexistent" } });

    expect(screen.getByText('No results found for "Nonexistent"')).toBeInTheDocument();
  });

  it("clears search on clicking a result", () => {
    render(<Search posts={mockPosts} />);
    const input = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(input, { target: { value: "First" } });
    const link = screen.getByText("First Post");

    fireEvent.click(link);

    // Input should be cleared? The component logic:
    // onClick={() => { setIsOpen(false); setQuery(""); }}
    // So input value in DOM should update if it's controlled.
    expect(input).toHaveValue("");
  });
});
