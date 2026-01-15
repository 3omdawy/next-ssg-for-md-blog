import { render, screen } from "@testing-library/react";
import { TableOfContents } from "./TableOfContents";
import { TableOfContentsItem } from "@/types";
import { vi, describe, it, expect, beforeAll } from "vitest";

const mockItems: TableOfContentsItem[] = [
  { id: "header1", text: "Header 1", level: 2 },
  { id: "header2", text: "Header 2", level: 2 },
  { id: "sub-header", text: "Sub Header", level: 3 },
];

describe("TableOfContents", () => {
  beforeAll(() => {
    // Mock IntersectionObserver using a class to satisfy 'new' operator
    window.IntersectionObserver = class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as unknown as typeof IntersectionObserver;
  });

  it("renders all items", () => {
    render(<TableOfContents items={mockItems} />);
    expect(screen.getByText("Header 1")).toBeInTheDocument();
    expect(screen.getByText("Header 2")).toBeInTheDocument();
    expect(screen.getByText("Sub Header")).toBeInTheDocument();
  });

  it("renders nothing if items empty", () => {
    const { container } = render(<TableOfContents items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders Arabic title if content is Arabic", () => {
    const arabicItems: TableOfContentsItem[] = [{ id: "h1", text: "عنوان", level: 2 }];
    render(<TableOfContents items={arabicItems} />);
    expect(screen.getByText("العناوين")).toBeInTheDocument();
  });
});
