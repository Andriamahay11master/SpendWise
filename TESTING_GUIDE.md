# Unit Testing Guide for SpendWise

## Overview
This guide demonstrates various unit testing patterns using **Vitest** and **React Testing Library** for your React + TypeScript project.

---

## Installation

Before running tests, install the necessary dependencies:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom
```

Add this to `package.json` scripts:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## Testing Patterns

### 1. **Component Rendering Tests**
Verify that components render correctly without crashing.

```typescript
it('should render without crashing', () => {
  render(<Dashboard />);
  expect(screen.getByText(/Total Balance/)).toBeInTheDocument();
});
```

---

### 2. **DOM Element Tests**
Check if specific elements are present in the DOM.

```typescript
it('should display all dashboard cards with correct titles', () => {
  render(<Dashboard />);
  expect(screen.getByText(/Total Balance/)).toBeInTheDocument();
  expect(screen.getByText(/Monthly Spending/)).toBeInTheDocument();
});
```

---

### 3. **User Interaction Tests**
Test form submissions, button clicks, and input changes.

```typescript
it('should update input value on user typing', async () => {
  const user = userEvent.setup();
  render(<ExpensesForm onSubmit={vi.fn()} />);
  
  const input = screen.getByPlaceholderText(/amount/i);
  await user.type(input, '100');
  
  expect(input).toHaveValue('100');
});
```

---

### 4. **Props Testing**
Verify components behave correctly with different props.

```typescript
it('should display correct values from props', () => {
  const props = { value: 500, title: 'Food Budget' };
  render(<CategoryCard {...props} />);
  
  expect(screen.getByText('Food Budget')).toBeInTheDocument();
  expect(screen.getByText('500')).toBeInTheDocument();
});
```

---

### 5. **Mock Function Tests**
Verify callbacks are called with correct arguments.

```typescript
const mockOnSubmit = vi.fn();
render(<Form onSubmit={mockOnSubmit} />);

fireEvent.click(screen.getByRole('button', { name: /submit/i }));

expect(mockOnSubmit).toHaveBeenCalled();
expect(mockOnSubmit).toHaveBeenCalledTimes(1);
```

---

### 6. **Async/Await Tests**
Handle asynchronous operations and API calls.

```typescript
it('should load data and display results', async () => {
  render(<Analytics />);
  
  await waitFor(() => {
    expect(screen.getByText(/Loading/)).not.toBeInTheDocument();
  });
  
  expect(screen.getByText(/Results/)).toBeInTheDocument();
});
```

---

### 7. **Utility Function Tests**
Test pure functions and data transformations.

```typescript
describe('calculateCategorySpent', () => {
  it('should calculate correct percentage', () => {
    const result = calculateCategorySpent(250, 500);
    expect(result).toBe(50);
  });

  it('should handle edge cases', () => {
    expect(calculateCategorySpent(0, 500)).toBe(0);
    expect(calculateCategorySpent(500, 500)).toBe(100);
  });
});
```

---

### 8. **Mocking Child Components**
Isolate component testing by mocking child components.

```typescript
vi.mock('./DashboardCard', () => ({
  default: ({ title, value }: any) => <div>{title}: {value}</div>,
}));
```

---

### 9. **Conditional Rendering Tests**
Test different component states.

```typescript
it('should show loading state', () => {
  render(<Dashboard isLoading={true} />);
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

it('should show content when loaded', () => {
  render(<Dashboard isLoading={false} />);
  expect(screen.getByText(/Total Balance/)).toBeInTheDocument();
});
```

---

### 10. **Error Handling Tests**
Verify error states and error messages.

```typescript
it('should display error message on failure', async () => {
  const mockFetch = vi.fn().mockRejectedValue(new Error('API Error'));
  
  render(<Analytics fetchData={mockFetch} />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

---

## Common Testing Queries

### Query Methods
```typescript
// Find by text
screen.getByText('Total Balance')
screen.queryByText('Not Present')

// Find by role
screen.getByRole('button', { name: /submit/i })
screen.getByRole('heading', { level: 1 })

// Find by placeholder
screen.getByPlaceholderText(/amount/i)

// Find by label
screen.getByLabelText(/category/i)

// Find by test id (add data-testid to your components)
screen.getByTestId('dashboard-card')
```

---

## Best Practices

✅ **DO**:
- Test user behavior, not implementation
- Use semantic queries (getByRole, getByLabelText)
- Keep tests focused and independent
- Use descriptive test names
- Mock external dependencies (APIs, child components)
- Test edge cases and error scenarios

❌ **DON'T**:
- Test internal state directly
- Use query selectors (querySelector)
- Create dependencies between tests
- Test library internals
- Over-mock components

---

## Test Structure Example

```typescript
describe('ComponentName', () => {
  const mockOnSubmit = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should [describe behavior]', () => {
    // Arrange
    const props = { /* ... */ };
    
    // Act
    render(<Component {...props} />);
    
    // Assert
    expect(screen.getByText(/text/)).toBeInTheDocument();
  });
});
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run specific file
npm test Dashboard.test.tsx

# Watch mode
npm test -- --watch

# Generate coverage report
npm run test:coverage

# UI mode (visual test runner)
npm run test:ui
```

---

## Resources
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
