"use client";

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import GlobalError from "./global-error";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe("GlobalError", () => {
  it("should render the basic structure and content", () => {
    const error = new Error("Test global error");
    render(<GlobalError error={error} />, {
      container: document.documentElement,
    });

    // Check for html and body tags
    expect(document.querySelector("html")).toBeInTheDocument();
    expect(document.querySelector("body")).toBeInTheDocument();

    // Check for titles and descriptions
    expect(screen.getByText("Municipal Services")).toBeInTheDocument();
    expect(
      screen.getByText("Your Digital Gateway to Local Government Services")
    ).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("We are sorry, but something unexpected happened.")
    ).toBeInTheDocument();
  });

  it("should not render error digest when it is not available", () => {
    const error = new Error("Test global error");
    render(<GlobalError error={error} />, {
      container: document.documentElement,
    });

    expect(screen.queryByText(/Error Reference:/)).not.toBeInTheDocument();
  });

  it("should render the error digest when available", () => {
    const error = new Error("Test global error");
    // @ts-expect-error Next.js adds a digest property to the Error object
    error.digest = "GLOBAL-54321";
    render(<GlobalError error={error} />, {
      container: document.documentElement,
    });

    expect(
      screen.getByText("Error Reference: GLOBAL-54321")
    ).toBeInTheDocument();
  });

  it("should render the illustration image", () => {
    const error = new Error("Test global error");
    render(<GlobalError error={error} />, {
      container: document.documentElement,
    });

    const image = screen.getByAltText("Connection lost illustration");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/undraw_connection-lost_am29.svg");
  });

  it("should render a link to the homepage", () => {
    const error = new Error("Test global error");
    render(<GlobalError error={error} />, {
      container: document.documentElement,
    });

    const homeLink = screen.getByRole("link", { name: "Go to Home" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
