import { IoFastFood } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import {
  MdEmojiTransportation,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "react-router";
import { useEffect, useState, type ReactElement } from "react";
import React, { type SubmitEvent } from "react";
import { TiShoppingCart } from "react-icons/ti";
import type { CategoryType } from "../../type/CategoryType";
import { hexToRgb } from "../../utils/function";
import { CiMobile4, CiPlane } from "react-icons/ci";

interface ExpensesFormProps {
  onSubmit: (formData: {
    amount: string;
    category: string;
    iconCategory: string;
    colorCategory: string;
    dateE: string;
    notes: string;
  }) => void;
}
const ExpensesForm = ({ onSubmit }: ExpensesFormProps) => {
  const navigate = useNavigate();
  const [dataCategory, setDataCategory] = useState<CategoryType[]>([]);

  interface CategoryIconProps {
    color?: string;
  }

  const iconMap: Record<string, ReactElement<CategoryIconProps>> = {
    IoFastFood: <IoFastFood />,
    GiPartyPopper: <GiPartyPopper />,
    MdEmojiTransportation: <MdEmojiTransportation />,
    MdOutlineHealthAndSafety: <MdOutlineHealthAndSafety />,
    TiShoppingCart: <TiShoppingCart />,
    CiMobile4: <CiMobile4 />,
    CiPlane: <CiPlane />,
  };

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    iconCategory: "",
    colorCategory: "",
    dateE: "",
    notes: "",
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
    await onSubmit(formData);
    setTimeout(() => {
      resetForm();
      navigate("/transactions");
    }, 1000);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setDataCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
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
          <button type="submit" className="btn btn-primary">
            <span>Save Transaction</span> <GoArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};
export default ExpensesForm;
