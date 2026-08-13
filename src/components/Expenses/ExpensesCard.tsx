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
  montant: number;
}
const ExpensesCard = ({
  id,
  icon,
  description,
  valueCategory,
  colorCategory,
  dateExpense,
  montant,
}: ExpensesCardProps) => {
  return (
    <Link to={`/expenses/${id}`} className="expenses-card">
      <div className="expenses-card-left">
        <div className="expenses-card-icon">
          {React.cloneElement(icon, { color: colorCategory })}
        </div>
        <div className="expenses-card-info">
          <div className="expenses-card-col">
            <p className="expenses-card-description">{description}</p>
            <p className="expenses-card-info">
              {valueCategory}
              <strong>{dateExpense}</strong>
            </p>
          </div>
          <div className="expenses-card-col">
            <p className="expenses-card-amount">${montant.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExpensesCard;
