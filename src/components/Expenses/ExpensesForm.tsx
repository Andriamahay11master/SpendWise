import { IoFastFood } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import { MdEmojiTransportation } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import React, { type SubmitEvent } from "react";
import { TiShoppingCart } from "react-icons/ti";

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
  const dataCategory = [
    {
      nameCategory: "Food",
      iconCategory: <IoFastFood />,
      iconCategoryName: "IoFastFood",
      color: "#fd21ac",
      rgbColor: "253, 33, 172",
    },
    {
      nameCategory: "Grocery shopping",
      iconCategory: <TiShoppingCart />,
      iconCategoryName: "TiShoppingCart",
      color: "#38d327",
      rgbColor: "56, 211, 39",
    },
    {
      nameCategory: "Entertainment",
      iconCategory: <GiPartyPopper />,
      iconCategoryName: "GiPartyPopper",
      color: "#f5a623",
      rgbColor: "245, 166, 35",
    },
    {
      nameCategory: "Transportation",
      iconCategory: <MdEmojiTransportation />,
      iconCategoryName: "MdEmojiTransportation",
      color: "#24d0fb",
      rgbColor: "245, 78, 66",
    },
  ];

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
                className={`category-item ${formData.category === data.nameCategory ? "active" : ""}`}
                key={index}
                onClick={() =>
                  handleCategorySelect(
                    data.nameCategory,
                    data.iconCategoryName,
                    data.color,
                  )
                }
              >
                <div
                  className="category-icon"
                  style={{ backgroundColor: `rgba(${data.rgbColor}, 0.1)` }}
                >
                  {React.cloneElement(data.iconCategory, { color: data.color })}
                </div>
                <p className="category-name">{data.nameCategory}</p>
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
