import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NavSecondary } from "./nav-secondary";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

// Mock UI components
vi.mock("@/components/ui/sidebar", () => ({
  SidebarGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group">{children}</div>
  ),
  SidebarGroupContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group-content">{children}</div>
  ),
  SidebarMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu">{children}</div>
  ),
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-item">{children}</div>
  ),
  SidebarMenuButton: ({
    children,
    isActive,
  }: {
    children: React.ReactNode;
    isActive?: boolean;
  }) => (
    <div data-testid="sidebar-menu-button" data-active={isActive}>
      {children}
    </div>
  ),
}));

const MockIcon = () => <svg data-testid="mock-icon" />;

const mockItems = [
  {
    title: "Item 1",
    url: "/item-1",
    icon: MockIcon,
  },
  {
    title: "Item 2",
    url: "/item-2",
  },
];

describe("NavSecondary", () => {
  it("should render all items", () => {
    render(<NavSecondary items={mockItems} />);
    expect(screen.getAllByTestId("sidebar-menu-item")).toHaveLength(2);
  });

  it("should render an item with icon and title", () => {
    render(<NavSecondary items={mockItems} />);
    const item1 = screen.getByText("Item 1");
    expect(item1).toBeInTheDocument();
    expect(item1.closest("a")).toHaveAttribute("href", "/item-1");
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("should render an item without an icon", () => {
    render(<NavSecondary items={mockItems} />);
    const item2 = screen.getByText("Item 2");
    expect(item2).toBeInTheDocument();
    expect(item2.closest("a")).toHaveAttribute("href", "/item-2");
    expect(
      item2.closest("div")?.querySelector('[data-testid="mock-icon"]')
    ).toBeNull();
  });

  it("should mark the active item", () => {
    render(<NavSecondary items={mockItems} currentPathname="/item-1" />);
    const item1Button = screen
      .getByText("Item 1")
      .closest('[data-testid="sidebar-menu-button"]');
    expect(item1Button).toHaveAttribute("data-active", "true");

    const item2Button = screen
      .getByText("Item 2")
      .closest('[data-testid="sidebar-menu-button"]');
    expect(item2Button).toHaveAttribute("data-active", "false");
  });
});
