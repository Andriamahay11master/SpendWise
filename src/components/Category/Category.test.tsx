import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryForm from "./CategoryForm";

describe("Category Form", () => {
  /*const mockOnSubmit = vi.fn();
    const defaultProps = {
        onSubmit: mockOnSubmit,
    };*/

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Form renders with all input fields
  it("should render form with all required input fields", () => {
    render(<CategoryForm />);

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
});
