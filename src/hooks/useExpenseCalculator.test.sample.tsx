import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react";

/**
 * HOOK TESTING SAMPLES
 * Examples of testing custom React hooks
 */

// Sample custom hook for demonstration
const useExpenseCalculator = (initialAmount: number) => {
  const [total, setTotal] = React.useState(initialAmount);

  const addExpense = (amount: number) => {
    setTotal((prev) => prev + amount);
  };

  const subtractExpense = (amount: number) => {
    setTotal((prev) => prev - amount);
  };

  const reset = () => {
    setTotal(initialAmount);
  };

  return { total, addExpense, subtractExpense, reset };
};

describe("useExpenseCalculator Hook", () => {
  // Test 1: Hook initializes with correct value
  it("should initialize with correct amount", () => {
    const { result } = renderHook(() => useExpenseCalculator(100));
    expect(result.current.total).toBe(100);
  });

  // Test 2: Add expense updates total
  it("should add expense to total", () => {
    const { result } = renderHook(() => useExpenseCalculator(100));

    act(() => {
      result.current.addExpense(50);
    });

    expect(result.current.total).toBe(150);
  });

  // Test 3: Subtract expense updates total
  it("should subtract expense from total", () => {
    const { result } = renderHook(() => useExpenseCalculator(100));

    act(() => {
      result.current.subtractExpense(30);
    });

    expect(result.current.total).toBe(70);
  });

  // Test 4: Reset resets to initial value
  it("should reset total to initial value", () => {
    const { result } = renderHook(() => useExpenseCalculator(100));

    act(() => {
      result.current.addExpense(50);
    });

    expect(result.current.total).toBe(150);

    act(() => {
      result.current.reset();
    });

    expect(result.current.total).toBe(100);
  });

  // Test 5: Multiple operations
  it("should handle multiple operations in sequence", () => {
    const { result } = renderHook(() => useExpenseCalculator(1000));

    act(() => {
      result.current.addExpense(100);
      result.current.addExpense(200);
      result.current.subtractExpense(50);
    });

    expect(result.current.total).toBe(1250);
  });
});

/**
 * INTEGRATION TESTING SAMPLES
 * Testing multiple components working together
 */

describe("Dashboard and Analytics Integration", () => {
  // Test 1: Data flows between components
  it("should display expense data from parent to child", () => {
    const mockData = {
      totalBalance: 5000,
      monthlySpent: 1500,
      categories: [
        { name: "Food", spent: 300, budget: 500 },
        { name: "Transport", spent: 200, budget: 400 },
      ],
    };

    render(
      <Dashboard data={mockData}>
        <Analytics data={mockData} />
      </Dashboard>,
    );

    expect(screen.getByText(/5000/)).toBeInTheDocument();
    expect(screen.getByText(/Food/)).toBeInTheDocument();
  });

  // Test 2: Child component callback triggers parent update
  it("should update parent state when child emits event", async () => {
    const handleExpenseAdded = vi.fn();

    render(
      <Dashboard onExpenseAdded={handleExpenseAdded}>
        <ExpensesForm onSubmit={handleExpenseAdded} />
      </Dashboard>,
    );

    const submitButton = screen.getByRole("button", { name: /submit|add/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleExpenseAdded).toHaveBeenCalled();
    });
  });
});

/**
 * SNAPSHOT TESTING SAMPLES
 * Capture component output and detect unintended changes
 */

describe("Snapshot Tests", () => {
  // Test 1: Component snapshot
  it("should match snapshot", () => {
    const { container } = render(
      <DashboardCard title="Total Balance" value={5000} currency="$" />,
    );
    expect(container).toMatchSnapshot();
  });

  // Test 2: Multiple component snapshots
  it("should match snapshot with different props", () => {
    const { container } = render(
      <CategoryCard name="Food" spent={250} budget={500} color="#47f64d" />,
    );
    expect(container).toMatchSnapshot();
  });
});

/**
 * ASYNC OPERATIONS TESTING
 * Testing components with API calls and promises
 */

describe("Async Component Tests", () => {
  // Test 1: Wait for async data to load
  it("should display data after async operation", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      data: [
        { id: 1, name: "Food", spent: 300 },
        { id: 2, name: "Transport", spent: 200 },
      ],
    });

    render(<Analytics fetchCategories={mockFetch} />);

    await waitFor(() => {
      expect(screen.getByText("Food")).toBeInTheDocument();
    });
  });

  // Test 2: Handle async errors
  it("should display error when async operation fails", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));

    render(<Analytics fetchCategories={mockFetch} />);

    await waitFor(() => {
      expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
    });
  });

  // Test 3: Cancel pending async operations
  it("should handle component unmount during async operation", async () => {
    const mockFetch = vi
      .fn()
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ data: [] }), 1000),
          ),
      );

    const { unmount } = render(<Analytics fetchCategories={mockFetch} />);

    unmount();

    // Component should clean up properly without errors
    expect(mockFetch).toHaveBeenCalled();
  });
});

/**
 * CONDITIONAL RENDERING TESTS
 */

describe("Conditional Rendering Tests", () => {
  // Test 1: Loading state
  it("should show loading indicator while fetching", () => {
    render(<Dashboard isLoading={true} />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  // Test 2: Error state
  it("should show error message on error", () => {
    render(<Dashboard error="Failed to load data" />);
    expect(screen.getByText(/Failed to load data/)).toBeInTheDocument();
  });

  // Test 3: Empty state
  it("should show empty state when no data", () => {
    render(<ExpensesList expenses={[]} />);
    expect(screen.getByText(/no expenses/i)).toBeInTheDocument();
  });

  // Test 4: Success state
  it("should show content when data is available", () => {
    const expenses = [
      { id: 1, name: "Groceries", amount: 50 },
      { id: 2, name: "Gas", amount: 30 },
    ];
    render(<ExpensesList expenses={expenses} />);
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("Gas")).toBeInTheDocument();
  });
});
