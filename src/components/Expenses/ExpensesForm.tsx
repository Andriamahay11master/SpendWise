import { IoFastFood } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import { MdEmojiTransportation } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router";
import { useState } from "react";

const ExpensesForm = () => {
  const dataCategory = [
    {
      nameCategory: "Food",
      iconCategory: <IoFastFood />,
      color: "#24d0fb",
    },
    {
      nameCategory: "Entertainment",
      iconCategory: <GiPartyPopper />,
      color: "#f5a623",
    },
    {
      nameCategory: "Transportation",
      iconCategory: <MdEmojiTransportation />,
      color: "#f54e42",
    },
  ];

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  // Single change handler for all text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="main-block">
      <form className="form-expense">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            name="amount"
            id="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="form-group fomr-category">
          <div className="form-group-top">
            <label htmlFor="category">Category</label>
            <input
              type="hidden"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
            />
            <Link to="/listCategories">View all</Link>
          </div>
          <div className="form-category-list">
            {dataCategory.map((data, index) => (
              <div className="category-item" key={index}>
                <div className="category-icon">{data.iconCategory}</div>
                <p className="category-name">{data.nameCategory}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="dateE">Date</label>
          <input type="date" name="dateE" id="dateE" value={formData.date} />
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
        <div className="form-group form-submit">
          <button type="submit" className="btn btn-primary">
            <span>Save Transaction</span> <GoArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};
export default ExpensesForm;
