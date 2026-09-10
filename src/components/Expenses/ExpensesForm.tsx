import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import React, { type SubmitEvent } from "react";
import type { CategoryType } from "../../type/CategoryType";
import { hexToRgb } from "../../utils/function";
import useCategoryIcon from "../../context/useCategoryIcon";
import type { ExpenseFormData } from "../../services/expenseService";
import { saveExpense } from "../../services/expenseService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchCategories = async (): Promise<CategoryType[]> => {
  const response = await fetch("http://localhost:5000/api/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

const ExpensesForm = () => {
  const iconMap = useCategoryIcon();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    iconCategory: "",
    colorCategory: "",
    dateE: "",
    notes: "",
  });
  const { data: dataCategory = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const saveExpenseMutation = useMutation({
    mutationFn: (data: ExpenseFormData) => saveExpense(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["expenses"] });
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      resetForm();
      navigate({ to: "/transactions" });
    },
  });

  // Single change handler for all text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for category selection
  const handleCategorySelect = (
    categoryName: string,
    iconCategoryName: string,
    colorCategory: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      category: categoryName,
      iconCategory: iconCategoryName,
      colorCategory: colorCategory,
    }));
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      category: "",
      iconCategory: "",
      colorCategory: "",
      dateE: "",
      notes: "",
    });
  };
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveExpenseMutation.mutate(formData);
  };
  return (
    <div className="main-block">
      <form className="form-expense" onSubmit={handleSubmit}>
        <div className="form-group form-amount">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="form-group form-category">
          <div className="form-group-top">
            <label htmlFor="category">Category</label>
            <input
              type="hidden"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
            />
            <input
              type="hidden"
              name="iconCategory"
              id="iconCategory"
              value={formData.iconCategory}
              onChange={handleChange}
            />
            <input
              type="hidden"
              name="colorCategory"
              id="colorCategory"
              value={formData.colorCategory}
              onChange={handleChange}
            />
            <Link to="/listCategories">View all</Link>
          </div>
          <div className="form-category-list">
            {dataCategory.map((data, index) => (
              <div
                className={`category-item ${formData.category === data.name ? "active" : ""}`}
                key={index}
                onClick={() =>
                  handleCategorySelect(data.name, data.icon, data.color)
                }
              >
                <div
                  className="category-icon"
                  style={{
                    backgroundColor: `rgba(${hexToRgb(data.color)?.r}, ${hexToRgb(data.color)?.g}, ${hexToRgb(data.color)?.b}, 0.1)`,
                  }}
                >
                  {React.cloneElement(iconMap[data.icon], {
                    color: data.color,
                  })}
                </div>
                <p className="category-name">{data.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="dateE">Date</label>
          <input
            type="date"
            name="dateE"
            id="dateE"
            value={formData.dateE}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            name="notes"
            id="notes"
            placeholder="Add notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <div className="form-group form-button">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saveExpenseMutation.isPending}
          >
            <span>
              {saveExpenseMutation.isPending ? "Saving..." : "Save Transaction"}
            </span>
            {!saveExpenseMutation.isPending && <GoArrowRight />}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ExpensesForm;
