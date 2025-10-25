import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NavMain } from "./nav-main";

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

// Mock lucide-react
vi.mock("lucide-react", () => ({
  ChevronRight: () => <svg data-testid="chevron-right" />,
}));

// Mock UI components
vi.mock("@/components/ui/collapsible", () => ({
  Collapsible: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="collapsible">{children}</div>
  ),
  CollapsibleTrigger: ({ children }: { children: React.ReactNode }) => (
    <button data-testid="collapsible-trigger">{children}</button>
  ),
  CollapsibleContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="collapsible-content">{children}</div>
  ),
}));

vi.mock("@/components/ui/sidebar", () => ({
  SidebarGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group">{children}</div>
  ),
  SidebarGroupLabel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group-label">{children}</div>
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
  SidebarMenuAction: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-action">{children}</div>
  ),
  SidebarMenuSub: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-sub">{children}</div>
  ),
  SidebarMenuSubItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-sub-item">{children}</div>
  ),
  SidebarMenuSubButton: ({
    children,
    isActive,
  }: {
    children: React.ReactNode;
    isActive?: boolean;
  }) => (
    <div data-testid="sidebar-menu-sub-button" data-active={isActive}>
      {children}
    </div>
  ),
}));

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

// Mock lucide-react
vi.mock("lucide-react", () => ({
  ChevronRight: () => <svg data-testid="chevron-right" />,
}));

// Mock UI components
vi.mock("@/components/ui/collapsible", () => ({
  Collapsible: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="collapsible">{children}</div>
  ),
  CollapsibleTrigger: ({ children }: { children: React.ReactNode }) => (
    <button data-testid="collapsible-trigger">{children}</button>
  ),
  CollapsibleContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="collapsible-content">{children}</div>
  ),
}));

vi.mock("@/components/ui/sidebar", () => ({
  SidebarGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group">{children}</div>
  ),
  SidebarGroupLabel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-group-label">{children}</div>
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
  SidebarMenuAction: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-action">{children}</div>
  ),
  SidebarMenuSub: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-sub">{children}</div>
  ),
  SidebarMenuSubItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-sub-item">{children}</div>
  ),
  SidebarMenuSubButton: ({
    children,
    isActive,
  }: {
    children: React.ReactNode;
    isActive?: boolean;
  }) => (
    <div data-testid="sidebar-menu-sub-button" data-active={isActive}>
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
    items: [
      { title: "Sub Item 1.1", url: "/item-1/sub-1" },
      { title: "Sub Item 1.2", url: "/item-1/sub-2" },
    ],
  },
  {
    title: "Item 2",
    url: "/item-2",
  },
];

describe("NavMain", () => {
  it("should render the group label and items", () => {
    render(
      <NavMain
        items={mockItems}
        groupLabel="Test Group"
        currentPathname="/item-1"
      />
    );
    expect(screen.getByText("Test Group")).toBeInTheDocument();
    expect(screen.getAllByTestId("sidebar-menu-item")).toHaveLength(2);
  });

  describe("NavMainItem", () => {
    it("should render an item with an icon, title, and sub-items", () => {
      render(
        <NavMain
          items={mockItems}
          groupLabel="Test Group"
          currentPathname="/item-1"
        />
      );
      const item1 = screen.getByText("Item 1");
      expect(item1).toBeInTheDocument();
      expect(item1.closest("a")).toHaveAttribute("href", "/item-1");
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
      expect(screen.getByTestId("collapsible-trigger")).toBeInTheDocument();
      expect(screen.getAllByTestId("sidebar-menu-sub-item")).toHaveLength(2);
    });

    it("should mark active item", () => {
      render(
        <NavMain
          items={mockItems}
          groupLabel="Test Group"
          currentPathname="/item-1"
        />
      );
      const item1Button = screen
        .getByText("Item 1")
        .closest('[data-testid="sidebar-menu-button"]');
      expect(item1Button).toHaveAttribute("data-active", "true");
    });

    it("should render an item without sub-items", () => {
      render(
        <NavMain
          items={mockItems}
          groupLabel="Test Group"
          currentPathname="/item-2"
        />
      );
      const item2 = screen.getByText("Item 2");
      expect(item2).toBeInTheDocument();
      expect(item2.closest("a")).toHaveAttribute("href", "/item-2");
      expect(
        item2
          .closest('[data-testid="sidebar-menu-item"]')
          ?.querySelector('[data-testid="collapsible-trigger"]')
      ).toBeNull();
    });

    it("should open collapsible when item is active", () => {
      render(
        <NavMain
          items={[{ ...mockItems[0], isActive: true }]}
          groupLabel="Test Group"
          currentPathname="/item-1"
        />
      );

      expect(screen.getByTestId("collapsible")).toBeInTheDocument();
    });

    it("should not render sub-items if items is an empty array", () => {
      render(
        <NavMain
          items={[{ ...mockItems[0], items: [] }]}
          groupLabel="Test Group"
          currentPathname="/item-1"
        />
      );
      expect(
        screen.queryByTestId("collapsible-content")
      ).not.toBeInTheDocument();
    });
  });

  describe("NavMainSubItem", () => {
    it("should render a sub-item", () => {
      render(
        <NavMain
          items={mockItems}
          groupLabel="Test Group"
          currentPathname="/item-1/sub-1"
        />
      );
      const subItem = screen.getByText("Sub Item 1.1");
      expect(subItem).toBeInTheDocument();
      expect(subItem.closest("a")).toHaveAttribute("href", "/item-1/sub-1");
    });

    it("should mark active sub-item", () => {
      render(
        <NavMain
          items={mockItems}
          groupLabel="Test Group"
          currentPathname="/item-1/sub-1"
        />
      );
      const subItemButton = screen
        .getByText("Sub Item 1.1")
        .closest('[data-testid="sidebar-menu-sub-button"]');
      expect(subItemButton).toHaveAttribute("data-active", "true");
    });
  });
});
