import React, { type ReactElement } from "react";
import { Link } from "react-router-dom";
interface ExpensesIconProps {
  color?: string;
}
interface ExpensesCardProps {
  id: string;
  icon: ReactElement<ExpensesIconProps>;
  description: string;
  valueCategory: string;
  colorCategory: string;
  dateExpense: string;
  currency: string;
  montant: number;
}
const ExpensesCard = ({
  id,
  icon,
  description,
  valueCategory,
  colorCategory,
  dateExpense,
  currency = "$",
  montant,
}: ExpensesCardProps) => {
  const date = new Date(dateExpense);
  return (
    <Link to={`/expenses/${id}`} className="expenses-card">
      <div className="expenses-card-icon">
        {React.cloneElement(icon, { color: colorCategory })}
      </div>
      <div className="expenses-card-info">
        <div className="expenses-card-col">
          <p className="expenses-card-description">{description}</p>
          <p className="expenses-card-info-plus">
            {valueCategory}
            <strong>{date.toLocaleDateString()}</strong>
          </p>
        </div>
        <div className="expenses-card-col">
          <p className="expenses-card-amount">
            {currency}
            {montant.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ExpensesCard;
