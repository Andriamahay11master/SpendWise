interface CategoryProgressBarCardProps {
  nameCategory: string;
  iconCategory: React.ReactNode;
  budgetSpent: number;
  budgetMax: number;
  currency?: string;
}
const CategoryProgressBarCard = ({
  nameCategory,
  iconCategory,
  budgetSpent,
  budgetMax,
  currency = "$",
}: CategoryProgressBarCardProps) => {
  return (
    <div className="category-progress-bar-card">
      <div className="category-progress-bar-card-top">
        <div className="category-progress-bar">
          <div
            className="category-progress-bar-fill"
            style={{ width: `${(budgetSpent / budgetMax) * 100}%` }}
          ></div>
        </div>
        {iconCategory}
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
