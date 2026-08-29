# Unit Testing Cheat Sheet

## Quick Reference for Common Test Patterns

### 1. Basic Component Test

```typescript
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('should render', () => {
    render(<Component />);
    expect(screen.getByText(/text/)).toBeInTheDocument();
  });
});
```

### 2. With Props

```typescript
it('should display prop value', () => {
  render(<Component title="My Title" value={100} />);
  expect(screen.getByText('My Title')).toBeInTheDocument();
});
```

### 3. User Interaction

```typescript
import userEvent from '@testing-library/user-event';

it('should handle click', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

### 4. Form Input

```typescript
it('should update input value', async () => {
  const user = userEvent.setup();
  render(<Input placeholder="Enter amount" />);

  const input = screen.getByPlaceholderText('Enter amount');
  await user.type(input, '100');

  expect(input).toHaveValue('100');
});
```

### 5. Async Operations

```typescript
import { waitFor } from '@testing-library/react';

it('should load data', async () => {
  const mockFetch = vi.fn().mockResolvedValue({ data: [] });

  render(<Component onLoad={mockFetch} />);

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalled();
  });
});
```

### 6. Mocking

```typescript
// Mock entire module
vi.mock('./api', () => ({
  fetchData: vi.fn().mockResolvedValue({ id: 1 })
}));

// Mock function
const mockFn = vi.fn();
mockFn.mockReturnValue('value');
mockFn.mockResolvedValue('async value');
mockFn.mockRejectedValue(new Error('Error'));

// Mock child component
vi.mock('./Child', () => ({
  default: () => <div>Mock Child</div>
}));
```

### 7. Testing Hooks

```typescript
import { renderHook, act } from "@testing-library/react";

it("should update hook state", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

### 8. Conditional Rendering

```typescript
it('should show loading state', () => {
  render(<Component isLoading={true} />);
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

it('should show content when loaded', () => {
  render(<Component isLoading={false} />);
  expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
});
```

### 9. Query Selectors

```typescript
// By text
screen.getByText("Hello");
screen.getByText(/hello/i); // case insensitive regex

// By role
screen.getByRole("button", { name: /click/i });
screen.getByRole("heading", { level: 1 });

// By placeholder
screen.getByPlaceholderText("Enter name");

// By label
screen.getByLabelText("Email");

// By test id (requires data-testid in component)
screen.getByTestId("custom-element");

// Query vs Get vs Find
screen.getByText(); // throws if not found
screen.queryByText(); // returns null if not found
screen.findByText(); // returns promise, waits for element
```

### 10. Assertions

```typescript
// Presence
expect(element).toBeInTheDocument();
expect(element).toBeVisible();

// Content
expect(element).toHaveTextContent("text");
expect(element).toHaveValue("value");

// Classes & Attributes
expect(element).toHaveClass("active");
expect(element).toHaveAttribute("disabled");

// Functions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith("arg");
expect(mockFn).toHaveBeenCalledTimes(2);

// State
expect(input).toBeDisabled();
expect(input).toBeEnabled();
expect(input).toBeChecked();

// Existence
expect(element).toBeDefined();
expect(element).not.toBeDefined();
```

### 11. Setup & Teardown

```typescript
describe("Component", () => {
  beforeEach(() => {
    // Runs before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Runs after each test
    vi.resetAllMocks();
  });

  beforeAll(() => {
    // Runs once before all tests
  });

  afterAll(() => {
    // Runs once after all tests
  });
});
```

### 12. Test Structure (AAA Pattern)

```typescript
it('should [expected behavior]', () => {
  // Arrange: Set up test data
  const mockData = { id: 1, name: 'Test' };
  const mockFn = vi.fn();

  // Act: Perform action
  render(<Component data={mockData} onAction={mockFn} />);
  fireEvent.click(screen.getByRole('button'));

  // Assert: Verify result
  expect(mockFn).toHaveBeenCalled();
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### 13. Common Mistakes to Avoid

```typescript
// ❌ DON'T: Wait without async
fireEvent.click(button);
expect(screen.getByText("Loaded")).toBeInTheDocument();

// ✅ DO: Use async/await with waitFor
fireEvent.click(button);
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});

// ❌ DON'T: Test implementation details
expect(component.state.value).toBe(5);

// ✅ DO: Test user-visible behavior
expect(screen.getByText("Value: 5")).toBeInTheDocument();

// ❌ DON'T: Create dependencies between tests
let globalValue;
it("test 1", () => {
  globalValue = 5;
});
it("test 2", () => {
  expect(globalValue).toBe(5);
});

// ✅ DO: Keep tests independent
it("test 1", () => {
  const value = 5; /* ... */
});
it("test 2", () => {
  const value = 5; /* ... */
});
```

### 14. Debugging Tests

```typescript
// Print DOM
screen.debug();

// Check specific element
screen.debug(element);

// Log all accessible roles
screen.logTestingPlaygroundURL();

// Use testing playground in browser
import { screen } from "@testing-library/react";
// Copy URL from console and paste in browser
```

## Files in Your Project

- **Dashboard.test.tsx** - Component rendering and data display tests
- **Expenses.test.sample.tsx** - Form testing with validation
- **utils.test.sample.ts** - Pure function and utility testing
- **useExpenseCalculator.test.sample.tsx** - Hook, integration, and async tests
- **TESTING_GUIDE.md** - Complete testing documentation
