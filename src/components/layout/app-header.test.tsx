import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppHeader } from "./app-header";

vi.mock("@/components/theme/mode-toggle", () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />,
}));

vi.mock("@/components/ui/separator", () => ({
  Separator: ({
    className,
    orientation,
  }: {
    className?: string;
    orientation?: "horizontal" | "vertical";
  }) => (
    <div
      data-testid="separator"
      data-orientation={orientation}
      className={className}
    />
  ),
}));

vi.mock("@/components/ui/sidebar", () => ({
  SidebarTrigger: ({ className }: { className?: string }) => (
    <button data-testid="sidebar-trigger" className={className} />
  ),
}));

describe("AppHeader", () => {
  describe("Rendering & Structure", () => {
    it("should render the header with its elements", () => {
      render(<AppHeader />);

      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("flex h-16 shrink-0 items-center gap-2");

      expect(screen.getByTestId("sidebar-trigger")).toBeInTheDocument();
      expect(screen.getByTestId("separator")).toBeInTheDocument();
      expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
    });

    it("should apply correct classes to child components", () => {
      render(<AppHeader />);

      const sidebarTrigger = screen.getByTestId("sidebar-trigger");
      expect(sidebarTrigger).toHaveClass("-ml-1");

      const separator = screen.getByTestId("separator");
      expect(separator).toHaveClass("mr-2 data-[orientation=vertical]:h-4");
      expect(separator).toHaveAttribute("data-orientation", "vertical");
    });
  });
});
