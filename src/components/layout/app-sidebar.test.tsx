import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

describe("AppSidebar", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
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

    it("should display the correct version", () => {
      render(<AppSidebar />);
      expect(screen.getByText("Version 0.0.0-test")).toBeInTheDocument();
    });
  });

  describe("Navigation Content", () => {
    it("should render NavMain and NavSecondary with correct props", async () => {
      vi.doMock("@/lib/routes", () => ({
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

      const { AppSidebar: AppSidebarWithMocks } = await import("./app-sidebar");
      render(<AppSidebarWithMocks />);

      const navMain = screen.getByTestId("nav-main");
      expect(navMain).toBeInTheDocument();
      const navMainProps = JSON.parse(navMain.textContent!);
      expect(navMainProps.groupLabel).toBe("Home");
      expect(navMainProps.items).toEqual([
        {
          title: "Child",
          url: "/child",
          icon: undefined,
          items: [],
        },
      ]);
      expect(navMainProps.currentPathname).toBe("/mock-path");

      const navSecondary = screen.getByTestId("nav-secondary");
      expect(navSecondary).toBeInTheDocument();
      const navSecondaryProps = JSON.parse(navSecondary.textContent!);
      expect(navSecondaryProps.items).toEqual([
        { title: "Secondary", url: "/secondary", icon: undefined },
      ]);
      expect(navSecondaryProps.currentPathname).toBe("/mock-path");
    });

    it("should not render NavMain if navMainRoot is not found", async () => {
      vi.doMock("@/lib/routes", () => ({
        SidebarContentType: {
          NAV_MAIN_ROOT: "NAV_MAIN_ROOT",
          NAV_MAIN_ITEM: "NAV_MAIN_ITEM",
          NAV_SECONDARY_ITEM: "NAV_SECONDARY_ITEM",
        },
        routes: {
          "/secondary": {
            uri: "/secondary",
            title: "Secondary",
            sidebarContent: "NAV_SECONDARY_ITEM",
          },
        },
      }));

      const { AppSidebar: AppSidebarWithMocks } = await import("./app-sidebar");
      render(<AppSidebarWithMocks />);
      expect(screen.queryByTestId("nav-main")).not.toBeInTheDocument();
    });

    it("should filter out grandchildren that are not NAV_MAIN_ITEM", async () => {
      vi.doMock("@/lib/routes", () => ({
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
                children: {
                  "/grandchild": {
                    uri: "/grandchild",
                    title: "Grandchild",
                    sidebarContent: "NAV_MAIN_ITEM",
                  },
                  "/filtered-grandchild": {
                    uri: "/filtered-grandchild",
                    title: "Filtered Grandchild",
                    sidebarContent: "OTHER_TYPE",
                  },
                },
              },
            },
          },
        },
      }));

      const { AppSidebar: AppSidebarWithMocks } = await import("./app-sidebar");
      render(<AppSidebarWithMocks />);
      const navMain = screen.getByTestId("nav-main");
      const props = JSON.parse(navMain.textContent!);
      expect(props.items[0].items).toEqual([
        {
          title: "Grandchild",
          url: "/grandchild",
        },
      ]);
    });

    it("should handle child with empty children object", async () => {
      vi.doMock("@/lib/routes", () => ({
        SidebarContentType: {
          NAV_MAIN_ROOT: "NAV_MAIN_ROOT",
          NAV_MAIN_ITEM: "NAV_MAIN_ITEM",
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
                children: {},
              },
            },
          },
        },
      }));

      const { AppSidebar: AppSidebarWithMocks } = await import("./app-sidebar");
      render(<AppSidebarWithMocks />);
      const navMain = screen.getByTestId("nav-main");
      const props = JSON.parse(navMain.textContent!);

      expect(props.items).toEqual([
        {
          title: "Child",
          url: "/child",
          icon: undefined,
          items: [],
        },
      ]);
    });

    it("should handle navMainRoot without children", async () => {
      vi.doMock("@/lib/routes", () => ({
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
            // No children property
          },
        },
      }));

      const { AppSidebar: AppSidebarWithMocks } = await import("./app-sidebar");
      render(<AppSidebarWithMocks />);

      const navMain = screen.getByTestId("nav-main");
      const props = JSON.parse(navMain.textContent!);
      expect(props.groupLabel).toBe("Home");
      expect(props.items).toEqual([]);
    });

    it("should use empty string fallback when grandchild title is undefined", async () => {
      vi.doMock("@/lib/routes", () => ({
        SidebarContentType: {
          NAV_MAIN_ROOT: "NAV_MAIN_ROOT",
          NAV_MAIN_ITEM: "NAV_MAIN_ITEM",
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
                children: {
                  "/grandchild": {
                    uri: "/grandchild",
                    sidebarContent: "NAV_MAIN_ITEM",
                  },
                },
              },
            },
          },
        },
      }));

      const { AppSidebar: AppSidebarWithMocks } = await import("./app-sidebar");
      render(<AppSidebarWithMocks />);

      const navMain = screen.getByTestId("nav-main");
      const props = JSON.parse(navMain.textContent!);
      expect(props.items[0].items).toEqual([
        {
          title: "",
          url: "/grandchild",
        },
      ]);
    });

    it("should skip children that are not NAV_MAIN_ITEM", async () => {
      vi.doMock("@/lib/routes", () => ({
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
              "/child1": {
                uri: "/child1",
                title: "Child 1",
                sidebarContent: "NAV_MAIN_ITEM",
              },
              "/child2": {
                uri: "/child2",
                title: "Child 2",
                sidebarContent: "OTHER_TYPE",
              },
              "/child3": {
                uri: "/child3",
                title: "Child 3",
                sidebarContent: "NAV_SECONDARY_ITEM",
              },
            },
          },
        },
      }));

      const { AppSidebar: AppSidebarWithMocks } = await import("./app-sidebar");
      render(<AppSidebarWithMocks />);

      const navMain = screen.getByTestId("nav-main");
      const props = JSON.parse(navMain.textContent!);

      expect(props.items).toEqual([
        {
          title: "Child 1",
          url: "/child1",
          icon: undefined,
          items: [],
        },
      ]);
    });
  });
});
