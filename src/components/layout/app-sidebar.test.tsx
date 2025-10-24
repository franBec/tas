import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppSidebar } from "./app-sidebar";

// Mock package.json
vi.mock("../../../package.json", () => ({
  default: { version: "0.0.0-test" },
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/mock-path",
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="next-image" />
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
  }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  ),
}));

// Mock UI components
vi.mock("@/components/ui/sidebar", () => ({
  Sidebar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar">{children}</div>
  ),
  SidebarHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-header">{children}</div>
  ),
  SidebarContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-content">{children}</div>
  ),
  SidebarFooter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-footer">{children}</div>
  ),
  SidebarMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu">{children}</div>
  ),
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-item">{children}</div>
  ),
  SidebarMenuButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar-menu-button">{children}</div>
  ),
}));

// Mock Nav components
vi.mock("@/components/layout/nav-main", () => ({
  NavMain: (props: any) => (
    <div data-testid="nav-main">{JSON.stringify(props)}</div>
  ),
}));

vi.mock("@/components/layout/nav-secondary", () => ({
  NavSecondary: (props: any) => (
    <div data-testid="nav-secondary">{JSON.stringify(props)}</div>
  ),
}));

// Mock routes
vi.mock("@/lib/routes", () => ({
  SidebarContentType: {
    NAV_MAIN_ROOT: "NAV_MAIN_ROOT",
    NAV_MAIN_ITEM: "NAV_MAIN_ITEM",
    NAV_SECONDARY_ITEM: "NAV_SECONDARY_ITEM",
  },
  routes: {
    "/": {
      uri: "/",
      title: "Home",
      sidebarContent: "NAV_MAIN_ROOT",
      children: {
        "/child": {
          uri: "/child",
          title: "Child",
          sidebarContent: "NAV_MAIN_ITEM",
        },
      },
    },
    "/secondary": {
      uri: "/secondary",
      title: "Secondary",
      sidebarContent: "NAV_SECONDARY_ITEM",
    },
  },
}));

describe("AppSidebar", () => {
  it("should render the sidebar with header, content, and footer", () => {
    render(<AppSidebar />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-header")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-footer")).toBeInTheDocument();
  });

  it("should render the header with logo and title", () => {
    render(<AppSidebar />);
    const image = screen.getByTestId("next-image");
    expect(image).toHaveAttribute("src", "/government-fill.svg");
    expect(image).toHaveAttribute("alt", "Government");

    expect(screen.getByText("Municipal Services")).toBeInTheDocument();
    expect(screen.getByText("San Luis")).toBeInTheDocument();
  });

  it("should render NavMain with correct props", () => {
    render(<AppSidebar />);
    const navMain = screen.getByTestId("nav-main");
    expect(navMain).toBeInTheDocument();
    const props = JSON.parse(navMain.textContent!);
    expect(props.groupLabel).toBe("Home");
    expect(props.items).toEqual([
      {
        title: "Child",
        url: "/child",
        icon: undefined,
        items: [],
      },
    ]);
    expect(props.currentPathname).toBe("/mock-path");
  });

  it("should render NavSecondary with correct props", () => {
    render(<AppSidebar />);
    const navSecondary = screen.getByTestId("nav-secondary");
    expect(navSecondary).toBeInTheDocument();
    const props = JSON.parse(navSecondary.textContent!);
    expect(props.items).toEqual([
      { title: "Secondary", url: "/secondary", icon: undefined },
    ]);
    expect(props.currentPathname).toBe("/mock-path");
  });

  it("should display the correct version", () => {
    render(<AppSidebar />);
    expect(screen.getByText("Version 0.0.0-test")).toBeInTheDocument();
  });
});
