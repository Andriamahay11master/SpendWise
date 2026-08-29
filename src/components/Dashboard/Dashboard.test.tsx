import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

// Mock child components to isolate the component under test
vi.mock("./DashboardCard", () => ({
  default: ({ title, value }: any) => (
    <div>
      {title}: {value}
    </div>
  ),
}));

vi.mock("../Category/CategoryProgressBarCard", () => ({
  default: ({ nameCategory }: any) => <div>{nameCategory}</div>,
}));

vi.mock("../Expenses/ExpensesCard", () => ({
  default: () => <div>ExpensesCard</div>,
}));

describe("Dashboard Component", () => {
  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Component renders without crashing
  it("should render without crashing", () => {
    renderDashboard();
    expect(screen.getByText(/Total Balance/)).toBeTruthy();
  });

  // Test 2: Verify card data is displayed
  it("should display all dashboard cards with correct titles", () => {
    renderDashboard();
    expect(screen.getByText(/Total Balance/)).toBeTruthy();
    expect(screen.getByText(/Monthly Spending/)).toBeTruthy();
  });

  // Test 3: Verify category data is displayed
  it("should display all category cards", () => {
    renderDashboard();
    expect(screen.getByText("Food")).toBeTruthy();
    expect(screen.getByText("Entertainment")).toBeTruthy();
    expect(screen.getByText("Transportation")).toBeTruthy();
  });

  // Test 4: Verify ExpensesCard is rendered
  it("should render ExpensesCard component", () => {
    renderDashboard();
    expect(screen.getByText("ExpensesCard")).toBeTruthy();
  });

  // Test 5: Check if values are correct
  it("should display correct total balance value", () => {
    renderDashboard();
    expect(screen.getByText(/7548.453/)).toBeTruthy();
  });

  // Test 6: Verify monthly spending limit
  it("should display correct monthly spending value", () => {
    renderDashboard();
    expect(screen.getByText(/4210/)).toBeTruthy();
  });
});
