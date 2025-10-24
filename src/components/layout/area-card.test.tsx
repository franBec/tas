import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AreaCard } from "./area-card";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  ),
}));

// Mock UI components
vi.mock("@/components/ui/card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  ),
  CardContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className} data-testid="card-content">
      {children}
    </div>
  ),
}));

const MockIcon = ({ className }: { className?: string }) => (
  <svg className={className} data-testid="mock-icon" />
);

describe("AreaCard", () => {
  const defaultProps = {
    uri: "/test-uri",
    title: "Test Title",
    subtitle: "Test Subtitle",
    icon: MockIcon,
  };

  describe("Rendering & Structure", () => {
    it("should render a link wrapping the card", () => {
      render(<AreaCard {...defaultProps} />);
      const link = screen.getByTestId("next-link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", defaultProps.uri);
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    it("should render the card with correct content", () => {
      render(<AreaCard {...defaultProps} />);
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });
  });

  describe("Props & Variants", () => {
    it("should not render title if not provided", () => {
      const { title, ...props } = defaultProps;
      render(<AreaCard {...props} uri={props.uri} />);
      expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument();
    });

    it("should not render subtitle if not provided", () => {
      const { subtitle, ...props } = defaultProps;
      render(<AreaCard {...props} uri={props.uri} />);
      expect(screen.queryByText(defaultProps.subtitle)).not.toBeInTheDocument();
    });

    it("should render a placeholder if icon is not provided", () => {
      const { icon, ...props } = defaultProps;
      render(<AreaCard {...props} uri={props.uri} />);
      expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
      // Check for the placeholder div
      const cardContent = screen.getByTestId("card-content");
      const placeholder = cardContent.querySelector(".w-12.h-12");
      expect(placeholder).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have a heading for the title", () => {
      render(<AreaCard {...defaultProps} />);
      expect(
        screen.getByRole("heading", { name: defaultProps.title, level: 3 })
      ).toBeInTheDocument();
    });
  });
});
