import { describe, it, expect } from "vitest";
import { extractSeriesInfo, filePathToSlug } from "./posts";

describe("Post Utilities", () => {
  describe("extractSeriesInfo", () => {
    it("should return empty object for root files", () => {
      expect(extractSeriesInfo("post.md")).toEqual({});
      expect(extractSeriesInfo("hello-world.mdx")).toEqual({});
    });

    it("should extract series from directory name", () => {
      expect(extractSeriesInfo("react-course/01-intro.md")).toEqual({
        series: "React Course",
        seriesSlug: "react-course",
      });
    });

    it("should format series name correctly", () => {
      expect(extractSeriesInfo("01-web-development/post.md")).toEqual({
        series: "Web Development",
        seriesSlug: "01-web-development",
      });
    });
  });

  describe("filePathToSlug", () => {
    it("should remove .md extension", () => {
      expect(filePathToSlug("hello.md")).toBe("hello");
    });

    it("should remove .mdx extension", () => {
      expect(filePathToSlug("world.mdx")).toBe("world");
    });

    it("should handle nested paths", () => {
      expect(filePathToSlug("folder/post.md")).toBe("folder/post");
    });

    it("should return empty string for dotfile", () => {
      // Ideally it assumes valid input, but let's see.
      // The regex `/\.mdx?$/` just replaces the suffix.
      expect(filePathToSlug(".md")).toBe("");
    });
  });
});
