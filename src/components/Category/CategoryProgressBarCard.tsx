import React, { type ReactElement } from "react";
import CircularProgress from "../Circular/CircularProgressBar";

interface CategoryIconProps {
  color?: string;
}
interface CategoryProgressBarCardProps {
  nameCategory: string;
  iconCategory: ReactElement<CategoryIconProps>;
  budgetSpent: number;
  budgetMax: number;
  currency?: string;
  color: string;
}
const CategoryProgressBarCard = ({
  nameCategory,
  iconCategory,
  budgetSpent,
  budgetMax,
  currency = "$",
  color,
}: CategoryProgressBarCardProps) => {
  return (
    <div className="category-progress-bar-card">
      <div className="category-progress-bar-card-top">
        <div className="category-progress-bar">
          <CircularProgress
            value={(budgetSpent / budgetMax) * 100}
            color={color}
          />
          {React.cloneElement(iconCategory, { color })}
        </div>
      </div>
      <div className="category-progress-bar-card-bottom">
        <p className="category-progress-bar-card-name">{nameCategory}</p>
        <p className="category-progress-bar-card-budget">
          {currency}
          {budgetSpent.toFixed(2)} / {currency}
          {budgetMax.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CategoryProgressBarCard;
