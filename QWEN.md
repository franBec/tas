# Project Preferences

## Package manager

`pnpm` is preferred over `npm`

## Commits

- Don't commit unless explicitly asked for it
- Run the format script (`pnpm format`) before any commit to ensure consistent code style
- Include a summary of changes in commit messages for better documentation
  - When doing this summary, avoid analyzing large and complex files such as `*.svg` files and `pnpm-lock.yaml`

## Comments

Avoid adding code comments unless absolutely necessary for clarity

## Components

Prefer using shadcn components when possible for consistent UI

## Verification

Avoid starting a development server to verify changes. Usually there's going to be a development server already running at port 3000

## **React Component Testing Approach**

### **1. Test File Structure & Organization**

```tsx
// component-name.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from ' @testing-library/react'
import userEvent from ' @testing-library/user-event'
import { ComponentName } from './component-name'

// All mocks at the top
vi.mock('external-dependency', () => ({...}))

describe('ComponentName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering & Structure', () => {
    // Basic rendering tests
  })

  describe('Props & Variants', () => {
    // Props handling tests
  })

  describe('User Interactions', () => {
    // Event handling tests
  })

  describe('Conditional Rendering', () => {
    // Different states/conditions
  })

  describe('Accessibility', () => {
    // A11y and semantic tests
  })
})

describe('ComponentName Integration', () => {
  // Integration tests
})
```

### **2. Mocking Strategy**

**Mock external dependencies first:**

```tsx
// Mock Next.js components
vi.mock("next/link", () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

// Mock UI libraries
vi.mock(" @/components/ui/button", () => ({
  Button: ({ children, onClick, variant, ...props }: any) => (
    <button onClick={onClick} data-variant={variant} {...props}>
      {children}
    </button>
  ),
}));

// Mock hooks
const mockFunction = vi.fn();
vi.mock(" @/hooks/useCustomHook", () => ({
  useCustomHook: () => ({ action: mockFunction }),
}));
```

### **3. Test Coverage Areas (In Order)**

#### **A. Basic Rendering & Structure**

```tsx
it("should render with correct structure", () => {
  render(<Component />);

  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByTestId("component-wrapper")).toHaveAttribute(
    "class",
    "expected-classes"
  );
});
```

#### **B. Props & Variants**

```tsx
it("should handle different variants", () => {
  render(<Button variant="primary">Click me</Button>);

  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("data-variant", "primary");
});
```

#### **C. User Interactions**

```tsx
it("should handle click events", async () => {
  const user = userEvent.setup();
  const mockClick = vi.fn();

  render(<Button onClick={mockClick}>Click</Button>);

  await user.click(screen.getByRole("button"));
  expect(mockClick).toHaveBeenCalledOnce();
});
```

#### **D. Conditional Rendering**

```tsx
it("should render loading state", () => {
  render(<Component loading={true} />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
  expect(screen.queryByText("Content")).not.toBeInTheDocument();
});
```

#### **E. Error Handling**

```tsx
it("should throw error for invalid props", () => {
  expect(() => {
    render(<Component invalidProp="value" />);
  }).toThrow("Expected error message");
});
```

#### **F. Accessibility & Semantics**

```tsx
it("should have proper accessibility attributes", () => {
  render(<Component />);

  expect(screen.getByRole("button")).toHaveAttribute(
    "aria-label",
    "Expected label"
  );
  expect(screen.getByLabelText("Form field")).toBeInTheDocument();
});
```

### **4. Testing Patterns & Best Practices**

#### **Use Semantic Queries (Priority Order)**

1. `getByRole()` - Best for accessibility
2. `getByLabelText()` - Form elements
3. `getByText()` - Visible text
4. `getByTestId()` - Last resort

#### **Handle Mixed Content with Regex**

```tsx
// Instead of exact text match for mixed content
expect(screen.getByText(/Made by/)).toBeInTheDocument();
// Better than: expect(screen.getByText('Made by')).toBeInTheDocument()
```

#### **Test Component Structure vs Implementation**

```tsx
// Test the outcome, not implementation details
expect(screen.getByRole("button")).toBeEnabled();
// Instead of: expect(component.state.disabled).toBe(false)
```

#### **Use Data Attributes for Complex Selections**

```tsx
// In component: <div data-testid="complex-element">
// In test: screen.getByTestId('complex-element')
```

### **5. Mock Strategies by Dependency Type**

#### **UI Libraries (shadcn/ui, etc.)**

```tsx
vi.mock(" @/components/ui/card", () => ({
  Card: ({ children, className }: any) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  ),
  CardHeader: ({ children, ...props }: any) => (
    <div {...props} data-testid="card-header">
      {children}
    </div>
  ),
}));
```

#### **Icons**

```tsx
vi.mock("lucide-react", () => ({
  IconName: ({ className }: any) => (
    <svg className={className} data-testid="icon-name">
      <title>Icon Name</title>
    </svg>
  ),
}));
```

#### **Authentication (Clerk, Auth0, etc.)**

```tsx
vi.mock(" @clerk/nextjs", () => ({
  SignedIn: ({ children }: any) => (
    <div data-testid="signed-in">{children}</div>
  ),
  SignedOut: ({ children }: any) => (
    <div data-testid="signed-out">{children}</div>
  ),
}));
```

### **6. Integration Testing Approach**

```tsx
describe("Component Integration", () => {
  it("should work with all sub-components together", () => {
    render(
      <MainComponent>
        <SubComponent1 />
        <SubComponent2 />
      </MainComponent>
    );

    // Test the full flow
    expect(screen.getByTestId("main")).toBeInTheDocument();
    expect(screen.getByTestId("sub1")).toBeInTheDocument();
    expect(screen.getByTestId("sub2")).toBeInTheDocument();
  });
});
```

### **7. Common Anti-Patterns to Avoid**

❌ **Don't test implementation details**

```tsx
// Bad
expect(component.state.count).toBe(5);
// Good
expect(screen.getByText("Count: 5")).toBeInTheDocument();
```

❌ **Don't use generic selectors**

```tsx
// Bad
container.querySelector("div");
// Good
screen.getByRole("main");
```

❌ **Don't forget to clear mocks**

```tsx
beforeEach(() => {
  vi.clearAllMocks(); // Always do this
});
```

### **8. Test Naming Convention**

```tsx
// Structure: should [expected behavior] when [condition]
it("should render error message when validation fails", () => {});
it("should call onClick handler when button is clicked", () => {});
it("should hide content when user is not authenticated", () => {});
```

### **9. Coverage Goals**

- **Happy Path**: Normal usage scenarios
- **Edge Cases**: Empty states, loading, errors
- **User Interactions**: All clickable/interactive elements
- **Props Variants**: All different prop combinations
- **Accessibility**: ARIA attributes, semantic HTML
- **Responsive**: Key responsive behavior (if testable)

## **TypeScript Utility/Module Testing Approach**

### **1. Test File Structure & Organization**

```tsx
// utilities.test.ts
import { describe, expect, it } from "vitest";

import {
  constants,
  helperFunction,
  mainFunction,
  type TypeDefinition,
} from "./utilities";

describe("Module Name", () => {
  describe("Data Structures & Constants", () => {
    // Test configurations, constants, objects
  });

  describe("Core Functions", () => {
    describe("functionName", () => {
      // Happy path tests
      // Edge cases
      // Error conditions
    });
  });

  describe("Helper Functions", () => {
    // Secondary function tests
  });

  describe("Integration", () => {
    // Functions working together
  });

  describe("Data Validation", () => {
    // Type safety, data integrity
  });
});
```

### **2. Testing Categories by File Type**

#### **A. Configuration/Data Files**

```tsx
// routes.ts, config.ts, constants.ts
describe("Configuration Structure", () => {
  it("should have correct data structure", () => {
    expect(routes["/"]).toBeDefined();
    expect(routes["/"]).toEqual({
      name: "Home",
      uri: "/",
      icon: Home,
      doesDisplayInSidebar: true,
    });
  });

  it("should contain all required properties", () => {
    Object.values(routes).forEach((route) => {
      expect(route.uri).toBeDefined();
      expect(typeof route.uri).toBe("string");
    });
  });
});
```

#### **B. Pure Functions**

```tsx
// utils.ts, helpers.ts
describe("Pure Function", () => {
  it("should return expected result for valid input", () => {
    const result = formatDate("2023-01-01");
    expect(result).toBe("January 1, 2023");
  });

  it("should handle edge cases", () => {
    expect(formatDate("")).toBe("Invalid date");
    expect(formatDate(null)).toBe("Invalid date");
    expect(formatDate(undefined)).toBe("Invalid date");
  });

  it("should throw error for invalid input", () => {
    expect(() => formatDate("invalid")).toThrow("Invalid date format");
  });
});
```

#### **C. Class/Object Methods**

```tsx
// services.ts, classes.ts
describe("ServiceClass", () => {
  let service: ServiceClass;

  beforeEach(() => {
    service = new ServiceClass();
  });

  it("should initialize with default values", () => {
    expect(service.isReady).toBe(false);
    expect(service.data).toEqual([]);
  });

  it("should update state correctly", () => {
    service.initialize();
    expect(service.isReady).toBe(true);
  });
});
```

### **3. Test Patterns by Function Type**

#### **A. Search/Filter Functions**

```tsx
describe("findRouteByUri", () => {
  it("should find existing routes at all levels", () => {
    expect(findRouteByUri("/")).toBeDefined();
    expect(findRouteByUri("/areas")).toBeDefined();
    expect(findRouteByUri("/areas/gov")).toBeDefined();
    expect(findRouteByUri("/areas/gov/finance")).toBeDefined();
  });

  it("should return undefined for non-existent routes", () => {
    expect(findRouteByUri("/non-existent")).toBeUndefined();
    expect(findRouteByUri("/areas/fake")).toBeUndefined();
  });

  it("should handle malformed input", () => {
    expect(findRouteByUri("")).toBeUndefined();
    expect(findRouteByUri("//")).toBeUndefined();
    expect(findRouteByUri("///")).toBeUndefined();
  });
});
```

#### **B. Data Transformation Functions**

```tsx
describe("transformData", () => {
  it("should transform valid data correctly", () => {
    const input = { name: "test", value: 123 };
    const result = transformData(input);

    expect(result).toEqual({
      displayName: "test",
      numericValue: 123,
      processed: true,
    });
  });

  it("should handle empty/null input", () => {
    expect(transformData(null)).toEqual(defaultResult);
    expect(transformData({})).toEqual(defaultResult);
  });

  it("should preserve specific properties", () => {
    const input = { name: "test", id: "abc", extra: "data" };
    const result = transformData(input);

    expect(result.id).toBe("abc");
    expect(result.extra).toBeUndefined(); // Should not preserve extra
  });
});
```

#### **C. Validation Functions**

```tsx
describe("validateInput", () => {
  it("should pass for valid input", () => {
    expect(validateInput("valid@email.com")).toBe(true);
    expect(validateInput("test123")).toBe(true);
  });

  it("should fail for invalid input", () => {
    expect(validateInput("")).toBe(false);
    expect(validateInput("invalid")).toBe(false);
    expect(validateInput(null)).toBe(false);
  });

  it("should handle edge cases", () => {
    expect(validateInput("   ")).toBe(false); // Whitespace only
    expect(validateInput("a".repeat(1000))).toBe(false); // Too long
  });
});
```

#### **D. Calculation/Algorithm Functions**

```tsx
describe("calculateTax", () => {
  it("should calculate correctly for standard rates", () => {
    expect(calculateTax(100, 0.1)).toBe(10);
    expect(calculateTax(1000, 0.25)).toBe(250);
  });

  it("should handle zero and negative values", () => {
    expect(calculateTax(0, 0.1)).toBe(0);
    expect(calculateTax(-100, 0.1)).toBe(0); // Should not allow negative
  });

  it("should round to correct decimal places", () => {
    expect(calculateTax(100, 0.125)).toBe(12.5);
    expect(calculateTax(100, 0.1234)).toBe(12.34);
  });
});
```

### **4. Testing Complex Data Structures**

#### **A. Nested Objects/Trees**

```tsx
describe("Route Tree Structure", () => {
  const getAllRoutes = (routeMap: Record<string, RouteNode>): RouteNode[] => {
    const routes: RouteNode[] = [];

    const traverse = (routeMap: Record<string, RouteNode>) => {
      Object.values(routeMap).forEach((route) => {
        routes.push(route);
        if (route.children) {
          traverse(route.children);
        }
      });
    };

    traverse(routeMap);
    return routes;
  };

  it("should have valid structure at all levels", () => {
    const allRoutes = getAllRoutes(routes);

    allRoutes.forEach((route) => {
      expect(route.uri).toBeDefined();
      expect(typeof route.uri).toBe("string");
      expect(route.uri.startsWith("/")).toBe(true);
    });
  });
});
```

#### **B. Array Operations**

```tsx
describe("Array Utilities", () => {
  it("should filter correctly", () => {
    const items = [
      { name: "A", active: true },
      { name: "B", active: false },
      { name: "C", active: true },
    ];

    const active = filterActive(items);
    expect(active).toHaveLength(2);
    expect(active.map((item) => item.name)).toEqual(["A", "C"]);
  });

  it("should handle empty arrays", () => {
    expect(filterActive([])).toEqual([]);
    expect(filterActive(null)).toEqual([]);
  });
});
```

### **5. Error Testing Strategies**

#### **A. Exception Testing**

```tsx
describe("Error Handling", () => {
  it("should throw specific error for invalid input", () => {
    expect(() => {
      processData(null);
    }).toThrow("Input cannot be null");
  });

  it("should throw with error details", () => {
    expect(() => {
      validateUser({ email: "invalid" });
    }).toThrow("Invalid email format: invalid");
  });
});
```

#### **B. Graceful Degradation**

```tsx
describe("Fallback Behavior", () => {
  it("should return default when operation fails", () => {
    const result = safeOperation("bad-input");
    expect(result).toEqual(DEFAULT_RESULT);
  });

  it("should log errors but not throw", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = safeOperation("bad-input");

    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toBeDefined();

    consoleSpy.mockRestore();
  });
});
```

### **6. Integration Testing for Utilities**

```tsx
describe("Function Integration", () => {
  it("should work together in realistic scenarios", () => {
    const route = findRouteByUri("/areas/gov");
    const children = getChildRoutes(route!);

    expect(route).toBeDefined();
    expect(children).toBeDefined();
    expect(children!.length).toBeGreaterThan(0);
  });

  it("should maintain consistency across related functions", () => {
    const allRoutes = Object.keys(routes);

    allRoutes.forEach((uri) => {
      const found = findRouteByUri(uri);
      expect(found).toBeDefined();
      expect(found!.uri).toBe(uri);
    });
  });
});
```

### **7. Performance & Edge Case Testing**

```tsx
describe("Performance & Edge Cases", () => {
  it("should handle large datasets efficiently", () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }));

    const start = performance.now();
    const result = processLargeData(largeArray);
    const end = performance.now();

    expect(end - start).toBeLessThan(100); // Should complete in <100ms
    expect(result).toBeDefined();
  });

  it("should handle boundary values", () => {
    expect(calculateAge(new Date("1900-01-01"))).toBeGreaterThan(100);
    expect(calculateAge(new Date())).toBe(0);
    expect(calculateAge(new Date("2050-01-01"))).toBe(0); // Future date
  });
});
```

### **8. Type Safety Testing**

```tsx
describe("Type Safety", () => {
  it("should enforce correct types", () => {
    // This would catch TypeScript compilation errors
    const route: RouteNode = {
      uri: "/test",
      name: "Test",
      // icon: 'string' // Should cause TS error
    };

    expect(typeof route.uri).toBe("string");
    if (route.name) {
      expect(typeof route.name).toBe("string");
    }
  });
});
```

### **9. Testing Best Practices for .ts Files**

- Test the public API, not internals
- Cover all branches and edge cases
- Test error conditions explicitly
- Use descriptive test names that explain the scenario
- Group related tests with nested describe blocks
- Test integration between functions
- Validate data integrity and type safety
- Include performance tests for critical functions

### **10. Common Patterns by Utility Type**

| Utility Type         | Key Tests                          | Focus Areas            |
| -------------------- | ---------------------------------- | ---------------------- |
| **Config/Constants** | Structure, completeness, validity  | Data integrity         |
| **Pure Functions**   | Input/output, edge cases, errors   | Deterministic behavior |
| **Validators**       | Valid/invalid cases, boundaries    | Edge case handling     |
| **Transformers**     | Data shape, preservation, defaults | Data consistency       |
| **Calculators**      | Math accuracy, rounding, limits    | Numerical precision    |
| **Parsers**          | Format handling, malformed input   | Error resilience       |
