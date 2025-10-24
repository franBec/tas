import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getRouteNodeByUri } from "@/lib/routes";
import { createAreaWithGridPage, createAuthPage } from "./page-factory";

// Mock dependencies
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} data-testid="next-image" />,
}));

vi.mock("@/lib/routes", () => ({
  getRouteNodeByUri: vi.fn(),
}));

vi.mock("./area-card", () => ({
  AreaCard: (props: any) => (
    <div data-testid="area-card">{JSON.stringify(props)}</div>
  ),
}));

vi.mock("./page-layout", () => {
  interface MockPageLayout extends React.FC<{ children: React.ReactNode }> {
    displayName?: string;
    Header: React.FC<any> & { displayName?: string };
    Grid: React.FC<{ children: React.ReactNode }> & { displayName?: string };
    TwoColumn: React.FC<{ children: React.ReactNode }> & {
      displayName?: string;
    };
    LeftColumn: React.FC<{ children: React.ReactNode }> & {
      displayName?: string;
    };
    RightColumn: React.FC<{ children: React.ReactNode }> & {
      displayName?: string;
    };
  }

  const Mock: MockPageLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="page-layout">{children}</div>;
  Mock.displayName = "PageLayout";
  Mock.Header = (props: any) => (
    <div data-testid="page-layout-header">{JSON.stringify(props)}</div>
  );
  Mock.Header.displayName = "PageLayout.Header";
  Mock.Grid = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-layout-grid">{children}</div>
  );
  Mock.Grid.displayName = "PageLayout.Grid";
  Mock.TwoColumn = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-layout-two-column">{children}</div>
  );
  Mock.TwoColumn.displayName = "PageLayout.TwoColumn";
  Mock.LeftColumn = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-layout-left-column">{children}</div>
  );
  Mock.LeftColumn.displayName = "PageLayout.LeftColumn";
  Mock.RightColumn = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-layout-right-column">{children}</div>
  );
  Mock.RightColumn.displayName = "PageLayout.RightColumn";
  return { PageLayout: Mock };
});

const MockIcon = () => <svg />;

describe("Page Factory", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("createAreaWithGridPage", () => {
    const mockRouteNode = {
      uri: "/areas",
      title: "Areas",
      subtitle: "Explore different areas",
      icon: MockIcon,
      children: {
        "/areas/child1": {
          uri: "/areas/child1",
          title: "Child 1",
          subtitle: "Subtitle 1",
          icon: MockIcon,
        },
        "/areas/child2": {
          uri: "/areas/child2",
          title: "Child 2",
          subtitle: "Subtitle 2",
        },
      },
    };

    it("should create and render a grid page correctly", () => {
      vi.mocked(getRouteNodeByUri).mockReturnValue(mockRouteNode);
      const AreaPage = createAreaWithGridPage({ uri: "/areas" });
      render(<AreaPage />);

      expect(vi.mocked(getRouteNodeByUri)).toHaveBeenCalledWith("/areas");

      // Check header
      const header = screen.getByTestId("page-layout-header");
      const headerProps = JSON.parse(header.textContent!);
      expect(headerProps.title).toBe("Areas");
      expect(headerProps.subtitle).toBe("Explore different areas");

      // Check grid and cards
      expect(screen.getByTestId("page-layout-grid")).toBeInTheDocument();
      const areaCards = screen.getAllByTestId("area-card");
      expect(areaCards).toHaveLength(2);

      const card1Props = JSON.parse(areaCards[0].textContent!);
      expect(card1Props.title).toBe("Child 1");
      expect(card1Props.uri).toBe("/areas/child1");

      const card2Props = JSON.parse(areaCards[1].textContent!);
      expect(card2Props.title).toBe("Child 2");
      expect(card2Props.uri).toBe("/areas/child2");
    });
  });

  describe("createAuthPage", () => {
    const mockRouteNode = {
      uri: "/sign-in",
      title: "Sign In",
      subtitle: "Welcome back",
      icon: MockIcon,
    };

    it("should create and render an auth page correctly", () => {
      vi.mocked(getRouteNodeByUri).mockReturnValue(mockRouteNode);
      const AuthPage = createAuthPage({
        uri: "/sign-in",
        imageSrc: "/login.svg",
        altText: "Login Image",
        placeholderText: "Sign in form goes here",
      });
      render(<AuthPage />);

      expect(vi.mocked(getRouteNodeByUri)).toHaveBeenCalledWith("/sign-in");

      // Check layout and columns
      expect(screen.getByTestId("page-layout-two-column")).toBeInTheDocument();
      expect(screen.getByTestId("page-layout-left-column")).toBeInTheDocument();
      expect(
        screen.getByTestId("page-layout-right-column")
      ).toBeInTheDocument();

      // Check left column content
      const header = screen.getByTestId("page-layout-header");
      const headerProps = JSON.parse(header.textContent!);
      expect(headerProps.title).toBe("Sign In");
      expect(screen.getByText("Sign in form goes here")).toBeInTheDocument();

      // Check right column content
      const image = screen.getByTestId("next-image");
      expect(image).toHaveAttribute("src", "/login.svg");
      expect(image).toHaveAttribute("alt", "Login Image");
    });
  });
});
