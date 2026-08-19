import type { ReactElement } from "react";
import React from "react";

interface CategoryIconProps {
  color?: string;
}
interface CategoryCardProps {
  nameCategory: string;
  iconCategory: ReactElement<CategoryIconProps>;
  budgetSpent: number;
  budgetMax: number;
  currency?: string;
  color: string;
}
const CategoryCard = ({
  nameCategory,
  iconCategory,
  budgetSpent,
  budgetMax,
  currency = "$",
  color,
}: CategoryCardProps) => {
  const [budget, setBudget] = React.useState(budgetSpent);
  const changeBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setBudget(newValue);
  };
  return (
    <div className="category-card">
      <div className="category-top">
        <div className="category-col">
          <div className="category-icon">
            {React.cloneElement(iconCategory, { color })}
          </div>
          <p className="category-name">{nameCategory}</p>
        </div>
        <div className="category-col">
          <p className="category-amount" style={{ color: color }}>
            {currency}
            {budget.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="category-bottom">
        <div className="category-info">
          <p>Limit allocation</p>
          <p className="category-percentage status" style={{ color: color }}>
            {" "}
            {((budget / budgetMax) * 100).toFixed(2)}% of income
          </p>
        </div>
        <div className="category-range">
          <input
            type="range"
            min="0"
            max={budgetMax}
            value={budget}
            onChange={changeBudget}
          />
        </div>
      </div>
    </div>
  );
};
export default CategoryCard;
