import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PageLayout } from "./page-layout";

// Mock cn function
vi.mock("@/lib/utils", () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(" "),
}));

const MockIcon = ({ className }: { className?: string }) => (
  <svg className={className} data-testid="mock-icon" />
);

describe("PageLayout", () => {
  it("should render its children and apply base classes", () => {
    const { container } = render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    // The inner div
    expect(container.querySelector(".max-w-7xl")).toHaveClass(
      "max-w-7xl mx-auto px-4 py-8"
    );
    // The outer div
    expect(container.firstChild).toHaveClass("bg-background text-foreground");
  });

  it("should apply additional className", () => {
    const { container } = render(
      <PageLayout className="custom-class">
        <div>Test Content</div>
      </PageLayout>
    );
    expect(container.firstChild).toHaveClass(
      "bg-background text-foreground custom-class"
    );
  });
});

describe("PageLayout.Header", () => {
  it("should render title, subtitle, description, and icon", () => {
    render(
      <PageLayout.Header
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test Description"
        icon={MockIcon}
      />
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Test Title" })
    ).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("should not render subtitle if not provided", () => {
    render(<PageLayout.Header title="Test Title" />);
    expect(screen.queryByText("Test Subtitle")).not.toBeInTheDocument();
  });

  it("should not render description if not provided", () => {
    render(<PageLayout.Header title="Test Title" />);
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });

  it("should not render icon if not provided", () => {
    render(<PageLayout.Header title="Test Title" />);
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});

describe("PageLayout.TwoColumn", () => {
  it("should render children and apply default grid classes", () => {
    const { container } = render(
      <PageLayout.TwoColumn>
        <div>Col 1</div>
        <div>Col 2</div>
      </PageLayout.TwoColumn>
    );
    expect(screen.getByText("Col 1")).toBeInTheDocument();
    expect(screen.getByText("Col 2")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      "grid md:grid-cols-2 gap-12 items-center"
    );
  });

  it("should apply reverse class when reverse prop is true", () => {
    const { container } = render(
      <PageLayout.TwoColumn reverse>
        <div>Col 1</div>
        <div>Col 2</div>
      </PageLayout.TwoColumn>
    );
    expect(container.firstChild).toHaveClass("md:grid-flow-dense");
  });
});

describe("PageLayout.LeftColumn", () => {
  it("should render children and apply base classes", () => {
    const { container } = render(
      <PageLayout.LeftColumn>
        <div>Left Content</div>
      </PageLayout.LeftColumn>
    );
    expect(screen.getByText("Left Content")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("space-y-6");
  });
});

describe("PageLayout.RightColumn", () => {
  it("should render children and apply base classes", () => {
    const { container } = render(
      <PageLayout.RightColumn>
        <div>Right Content</div>
      </PageLayout.RightColumn>
    );
    expect(screen.getByText("Right Content")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      "flex justify-center md:justify-end"
    );
  });
});

describe("PageLayout.Grid", () => {
  it("should render children and apply default 4-column grid classes", () => {
    const { container } = render(
      <PageLayout.Grid>
        <div>Item 1</div>
      </PageLayout.Grid>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    );
  });

  it("should apply 2-column grid classes", () => {
    const { container } = render(
      <PageLayout.Grid columns={2}>
        <div>Item 1</div>
      </PageLayout.Grid>
    );
    expect(container.firstChild).toHaveClass(
      "grid gap-6 grid-cols-1 sm:grid-cols-2"
    );
  });

  it("should apply 3-column grid classes", () => {
    const { container } = render(
      <PageLayout.Grid columns={3}>
        <div>Item 1</div>
      </PageLayout.Grid>
    );
    expect(container.firstChild).toHaveClass(
      "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    );
  });
});
