"use client";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi } from "vitest";

import ErrorBoundary from "./error";

// Mock next/navigation
const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe("ErrorBoundary", () => {
  const reset = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render nothing for error message when digest is not available", () => {
    const error = new Error("Test error message");

    render(<ErrorBoundary error={error} reset={reset} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    expect(
      screen.getByText("We are sorry, but something unexpected happened.")
    ).toBeInTheDocument();

    expect(screen.queryByText("Test error message")).not.toBeInTheDocument(); // Changed assertion

    expect(
      screen.getByRole("button", { name: "Try Again" })
    ).toBeInTheDocument();
  });

  it("should render the error digest when available", () => {
    const error = new Error("Test error message");
    // @ts-expect-error Next.js adds a digest property to the Error object in production.
    error.digest = "12345-ABCDE";
    render(<ErrorBoundary error={error} reset={reset} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("We are sorry, but something unexpected happened.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Error Reference: 12345-ABCDE")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try Again" })
    ).toBeInTheDocument();
  });

  it("should render the illustration image", () => {
    const error = new Error("Test error message");
    render(<ErrorBoundary error={error} reset={reset} />);

    const image = screen.getByAltText("Connection lost illustration");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/undraw_connection-lost_am29.svg");
  });

  it('should call router.refresh and reset when "Try Again" is clicked', async () => {
    const error = new Error("Test error message");
    render(<ErrorBoundary error={error} reset={reset} />);

    const tryAgainButton = screen.getByRole("button", { name: "Try Again" });
    await user.click(tryAgainButton);

    expect(mockRefresh).toHaveBeenCalledTimes(1);
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
