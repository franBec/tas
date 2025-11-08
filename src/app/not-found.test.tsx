"use client";

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import NotFound from "./not-found";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
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

describe("NotFound", () => {
  it("should render the not found page content", () => {
    render(<NotFound />);

    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We are sorry, but the page you are looking for does not exist."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The link you followed may be broken, or the page may have been removed."
      )
    ).toBeInTheDocument();
  });

  it("should render the illustration image", () => {
    render(<NotFound />);

    const image = screen.getByAltText("Page not found illustration");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/undraw_void_wez2.svg");
  });

  it("should render a link to the homepage", () => {
    render(<NotFound />);

    const homeLink = screen.getByRole("link", { name: "Go to Homepage" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
