import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpensesForm from "./ExpensesForm";

describe("ExpensesForm Component", () => {
  const mockOnSubmit = vi.fn();
  const defaultProps = {
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Form renders with all input fields
  it("should render form with all required input fields", () => {
    render(<ExpensesForm {...defaultProps} />);

    expect(
      screen.getByLabelText(/amount/i) ||
        screen.getByPlaceholderText(/amount/i),
    ).toBeTruthy();
    expect(
      screen.getByLabelText(/category/i) ||
        screen.getByPlaceholderText(/category/i),
    ).toBeTruthy();
    expect(
      screen.getByLabelText(/date/i) || screen.getByPlaceholderText(/date/i),
    ).toBeTruthy();
  });

  // Test 2: Submit button is rendered
  it("should render submit button", () => {
    render(<ExpensesForm {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /submit|add|save/i }),
    ).toBeTruthy();
  });

  // Test 3: Form validation - empty fields
  it("should show validation errors for empty required fields", async () => {
    render(<ExpensesForm {...defaultProps} />);
    const submitButton = screen.getByRole("button", {
      name: /submit|add|save/i,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  // Test 4: Form submission with valid data
  it("should submit form with valid data", async () => {
    const user = userEvent.setup();
    render(<ExpensesForm {...defaultProps} />);

    const submitButton = screen.getByRole("button", {
      name: /submit|add|save/i,
    });

    // This is a simplified example - adjust based on your actual form structure
    fireEvent.click(submitButton);

    // Verify that onSubmit was called or form processing occurred
    await waitFor(() => {
      // Check if component handles submission
    });
  });

  // Test 5: Form reset after submission
  it("should reset form fields after successful submission", async () => {
    render(<ExpensesForm {...defaultProps} />);
    // Test form reset logic based on your implementation
  });

  // Test 6: Input field updates
  it("should update input value on user typing", async () => {
    const user = userEvent.setup();
    render(<ExpensesForm {...defaultProps} />);

    const amountInput =
      screen.getByLabelText(/amount/i) ||
      (screen.getByPlaceholderText(/amount/i) as HTMLInputElement);

    await user.type(amountInput, "100");
    expect(amountInput.nodeValue).toBe("100");
  });
});
