import React from "react";
import { CiCirclePlus } from "react-icons/ci";
const CategoryForm = () => {
  const [valueRange, setValueRange] = React.useState(0);
  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setValueRange(newValue);
    // Update CSS variable for gradient background
    const percent = (newValue / 1000) * 100;
    event.target.style.setProperty("--value", `${percent}%`);
  };
  return (
    <div className="main-block">
      <form>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input id="categoryName" type="text" placeholder="Category Name" />
        </div>
        <div className="form-group">
          <label htmlFor="selectIcon">Select Icon:</label>
          <input id="selectIcon" type="text" placeholder="Select Icon" />
        </div>
        <div className="form-group">
          <label htmlFor="selectColor">Select Color:</label>
          <input id="selectColor" type="color" placeholder="Select Color" />
        </div>
        <div className="form-group form-range">
          <div className="form-group-top">
            <label htmlFor="budget">Monthly Budget Limit:</label>
            <span className="currentRangeValue">${valueRange}</span>
          </div>
          <input
            id="budget"
            type="range"
            placeholder="Monthly Budget Limit"
            min="0"
            max="1000"
            step="50"
            value={valueRange}
            onChange={handleRangeChange}
          />
          <div className="range-intervalle-value">
            <p className="range-value">0</p>
            <p className="range-value">1000</p>
          </div>
        </div>
        <div className="form-group form-button">
          <button type="submit" className="btn btn-primary">
            <CiCirclePlus />
            <span className="button-text">Add Category</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
