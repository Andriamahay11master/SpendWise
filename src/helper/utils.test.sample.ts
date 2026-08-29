import { describe, it, expect, beforeEach, vi } from "vitest";

/**
 * UNIT TESTING SAMPLES FOR UTILITY FUNCTIONS
 * Examples of testing pure functions, data transformations, and helpers
 */

// Sample utility functions to test
export const calculateCategorySpent = (spent: number, max: number): number => {
  return (spent / max) * 100;
};

export const formatCurrency = (amount: number, currency = "$"): string => {
  return `${currency}${amount.toFixed(2)}`;
};

export const isWithinBudget = (spent: number, limit: number): boolean => {
  return spent <= limit;
};

export const getCategoryColor = (percentage: number): string => {
  if (percentage <= 50) return "#47f64d"; // Green
  if (percentage <= 75) return "#f5a623"; // Orange
  return "#ff4444"; // Red
};

describe("Utility Functions - calculateCategorySpent", () => {
  // Test 1: Basic calculation
  it("should calculate correct percentage", () => {
    const result = calculateCategorySpent(250, 500);
    expect(result).toBe(50);
  });

  // Test 2: Full budget spent
  it("should return 100 when budget fully spent", () => {
    const result = calculateCategorySpent(500, 500);
    expect(result).toBe(100);
  });

  // Test 3: Zero spending
  it("should return 0 when no spending", () => {
    const result = calculateCategorySpent(0, 500);
    expect(result).toBe(0);
  });

  // Test 4: Handle decimal values
  it("should handle decimal percentages", () => {
    const result = calculateCategorySpent(333, 1000);
    expect(result).toBe(33.3);
  });
});

describe("Utility Functions - formatCurrency", () => {
  // Test 1: Default currency
  it("should format with default dollar sign", () => {
    const result = formatCurrency(1234.567);
    expect(result).toBe("$1234.57");
  });

  // Test 2: Custom currency
  it("should format with custom currency symbol", () => {
    const result = formatCurrency(1234.567, "€");
    expect(result).toBe("€1234.57");
  });

  // Test 3: Whole numbers
  it("should format whole numbers with two decimals", () => {
    const result = formatCurrency(100);
    expect(result).toBe("$100.00");
  });

  // Test 4: Zero value
  it("should format zero", () => {
    const result = formatCurrency(0);
    expect(result).toBe("$0.00");
  });
});

describe("Utility Functions - isWithinBudget", () => {
  // Test 1: Within budget
  it("should return true when spent is less than limit", () => {
    expect(isWithinBudget(100, 500)).toBe(true);
  });

  // Test 2: At budget limit
  it("should return true when spent equals limit", () => {
    expect(isWithinBudget(500, 500)).toBe(true);
  });

  // Test 3: Over budget
  it("should return false when spent exceeds limit", () => {
    expect(isWithinBudget(600, 500)).toBe(false);
  });

  // Test 4: Zero limit
  it("should handle zero limit", () => {
    expect(isWithinBudget(1, 0)).toBe(false);
  });
});

describe("Utility Functions - getCategoryColor", () => {
  // Test 1: Green zone (0-50%)
  it("should return green for low spending", () => {
    expect(getCategoryColor(25)).toBe("#47f64d");
    expect(getCategoryColor(50)).toBe("#47f64d");
  });

  // Test 2: Orange zone (51-75%)
  it("should return orange for medium spending", () => {
    expect(getCategoryColor(60)).toBe("#f5a623");
    expect(getCategoryColor(75)).toBe("#f5a623");
  });

  // Test 3: Red zone (76-100%)
  it("should return red for high spending", () => {
    expect(getCategoryColor(80)).toBe("#ff4444");
    expect(getCategoryColor(100)).toBe("#ff4444");
  });

  // Test 4: Edge cases
  it("should handle boundary values", () => {
    expect(getCategoryColor(0)).toBe("#47f64d");
    expect(getCategoryColor(51)).toBe("#f5a623");
    expect(getCategoryColor(76)).toBe("#ff4444");
  });
});
