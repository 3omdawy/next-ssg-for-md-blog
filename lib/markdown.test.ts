import { describe, it, expect } from "vitest";
import { calculateReadingTime, generateExcerpt, isArabicText } from "./markdown";

describe("Markdown Utilities", () => {
  describe("calculateReadingTime", () => {
    it("should calculate reading time correctly", () => {
      const text = "word ".repeat(200); // 200 words
      expect(calculateReadingTime(text)).toBe(1);

      const text2 = "word ".repeat(400); // 400 words
      expect(calculateReadingTime(text2)).toBe(2);
    });

    it("should return 1 minute for short text", () => {
      expect(calculateReadingTime("Short text")).toBe(1);
    });
  });

  describe("generateExcerpt", () => {
    it("should generate excerpt of specified length", () => {
      const text =
        "This is a long text that should be truncated because it exceeds the specified length limit for the excerpt.";
      const excerpt = generateExcerpt(text, 10);
      expect(excerpt.length).toBeLessThanOrEqual(13); // 10 chars + "..."
      expect(excerpt).toBe("This is a...");
    });

    it("should strip markdown syntax", () => {
      const markdown = "# Header\n\n**Bold** text and *italic* text.";
      expect(generateExcerpt(markdown)).toBe("Header Bold text and italic text.");
    });
  });

  describe("isArabicText", () => {
    it("should detect Arabic text", () => {
      expect(isArabicText("مرحبا بكم في مدونتي")).toBe(true);
    });

    it("should detect English text as not Arabic", () => {
      expect(isArabicText("Welcome to my blog")).toBe(false);
    });

    it("should handle mixed text", () => {
      // Majority Arabic
      expect(isArabicText("مرحبا Hello")).toBe(true);
      // Majority English (Ensure Arabic is < 30%)
      // "Hello World This is English" (23 chars) + "مرحبا" (5 chars) = 5/28 = 0.17
      expect(isArabicText("Hello World This is English مرحبا")).toBe(false);
    });
  });
});
