/// <reference types="vitest/globals" />

import { render, renderHook, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";

import { useTextTruncated } from "./use-text-truncated";

// Helper component to test the hook in a real DOM environment
function TestWrapper({ text }: { text: string }) {
  const { ref, isTruncated } = useTextTruncated(text);

  return (
    <div>
      <span ref={ref} data-testid="text-span">
        {text}
      </span>
      <span data-testid="is-truncated">{isTruncated.toString()}</span>
    </div>
  );
}

describe("useTextTruncated", () => {
  let clientWidthSpy: MockInstance<any>;
  let scrollWidthSpy: MockInstance<any>;

  beforeEach(() => {
    // Mock clientWidth and scrollWidth on the HTMLElement prototype
    // This ensures that any span element created will have these mocked properties
    clientWidthSpy = vi.spyOn(HTMLElement.prototype, "clientWidth", "get");
    scrollWidthSpy = vi.spyOn(HTMLElement.prototype, "scrollWidth", "get");
  });

  it("should return ref and isTruncated", () => {
    const { result } = renderHook(() => useTextTruncated("short text"));
    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.isTruncated).toBe("boolean");
  });

  it("should set isTruncated to false for non-truncated text", () => {
    clientWidthSpy.mockReturnValue(200);
    scrollWidthSpy.mockReturnValue(50);
    render(<TestWrapper text="short text" />);
    expect(screen.getByTestId("is-truncated")).toHaveTextContent("false");
  });

  it("should set isTruncated to true for truncated text", () => {
    clientWidthSpy.mockReturnValue(50);
    scrollWidthSpy.mockReturnValue(500);
    render(
      <TestWrapper text="very very very long text that should be truncated" />
    );
    expect(screen.getByTestId("is-truncated")).toHaveTextContent("true");
  });

  it("should update isTruncated when text changes from non-truncated to truncated", () => {
    clientWidthSpy.mockReturnValue(100);
    scrollWidthSpy.mockReturnValue(50);
    const { rerender } = render(<TestWrapper text="short" />);
    expect(screen.getByTestId("is-truncated")).toHaveTextContent("false");

    clientWidthSpy.mockReturnValue(100);
    scrollWidthSpy.mockReturnValue(500);
    rerender(<TestWrapper text="very very very long text" />);
    expect(screen.getByTestId("is-truncated")).toHaveTextContent("true");
  });

  it("should update isTruncated when text changes from truncated to non-truncated", () => {
    clientWidthSpy.mockReturnValue(100);
    scrollWidthSpy.mockReturnValue(500);
    const { rerender } = render(
      <TestWrapper text="very very very long text" />
    );
    expect(screen.getByTestId("is-truncated")).toHaveTextContent("true");

    clientWidthSpy.mockReturnValue(100);
    scrollWidthSpy.mockReturnValue(50);
    rerender(<TestWrapper text="short" />);
    expect(screen.getByTestId("is-truncated")).toHaveTextContent("false");
  });
});
