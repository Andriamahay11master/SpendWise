import type { ReactElement } from "react";

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
  return <div>CategoryCard</div>;
};
export default CategoryCard;
