import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppFooter } from "./app-footer";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

describe("AppFooter", () => {
  describe("Rendering & Structure", () => {
    it("should render the footer with the correct container classes", () => {
      render(<AppFooter />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveClass("py-4 border-t");
    });

    it("should render the main text content", () => {
      render(<AppFooter />);
      // Use regex to handle mixed content
      expect(screen.getByText(/Made by/)).toBeInTheDocument();
      expect(screen.getByText(/with Next.js and ❤️/)).toBeInTheDocument();
    });

    it("should render the link to the author page with correct attributes", () => {
      render(<AppFooter />);
      const link = screen.getByTestId("next-link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/about-author");
      expect(link).toHaveClass("text-foreground hover:underline");
    });
  });

  describe("Accessibility", () => {
    it("should render the emoji link content", () => {
      render(<AppFooter />);
      const link = screen.getByRole("link");
      expect(link).toHaveTextContent("🐤");
    });
  });
});
