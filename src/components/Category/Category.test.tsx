import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";

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
      screen.getByLabelText(/budget/i) ||
        screen.getByPlaceholderText(/monthly budget limit/i),
    ).toBeTruthy();
    expect(
      screen.getByLabelText(/category name/i) ||
        screen.getByPlaceholderText(/category name/i),
    ).toBeTruthy();
    expect(
      screen.getByLabelText(/selectcolor/i) ||
        screen.getByPlaceholderText(/select color/i),
    ).toBeTruthy();
  });

  //Test 2: List of categories is rendered
  it("should render list of categories", () => {
    render(<CategoryList />);
    const categoryList = screen.getByTestId("category-list");
    expect(categoryList).toBeTruthy;
    expect(categoryList.children.length).toBeGreaterThan(0);
  });
});
