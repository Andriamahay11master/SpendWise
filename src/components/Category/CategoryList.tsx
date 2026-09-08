import { IoAddCircle } from "react-icons/io5";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router";
import type { CategoryType } from "../../type/CategoryType";
import useCategoryIcon from "../../context/useCategoryIcon";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const response = await fetch("http://localhost:5000/api/categories");
  return await response.json();
};

const CategoryList = () => {
  const iconMap = useCategoryIcon();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <div className="main-block category-list-block">
      <h1 className="title-h2">Category List</h1>
      <p className="page-desc">
        Optimize your financial flow by setting precise limits
      </p>
      <div className="category-list" data-testid="category-list">
        {categories?.length > 0 &&
          categories.map((item: CategoryType, index: number) => (
            <CategoryCard
              key={index}
              nameCategory={item.name}
              iconCategory={iconMap[item.icon] || iconMap.IoFastFood}
              budgetSpent={item.budgetCurrent}
              budgetMax={item.budgetMax}
              color={item.color}
            />
          ))}
        {categories?.length === 0 && (
          <p className="no-category-message">No categories available.</p>
        )}
      </div>
      <Link className="btn btn-primary" to="/addCategory">
        <IoAddCircle />
        add new category
      </Link>
    </div>
  );
};
export default CategoryList;
