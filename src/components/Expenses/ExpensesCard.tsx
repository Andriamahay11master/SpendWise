interface ExpensesCardProps {
  icon: React.ReactNode;
  description: string;
  valueCategory: string;
  dateExpense: string;
  montant: number;
}
const ExpensesCard = ({
  icon,
  description,
  valueCategory,
  dateExpense,
  montant,
}: ExpensesCardProps) => {
  return (
    <div className="expenses-card">
      <div className="expenses-card-left">
        <div className="expenses-card-icon">{icon}</div>
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
    </div>
  );
};

export default ExpensesCard;
