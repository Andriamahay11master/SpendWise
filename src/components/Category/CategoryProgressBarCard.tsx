import CircularProgress from "../Circular/CircularProgressBar";

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
          <CircularProgress value={(budgetSpent / budgetMax) * 100} />
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
