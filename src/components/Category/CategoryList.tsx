import { IoAddCircle } from "react-icons/io5";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router";
import React from "react";
import type { CategoryType } from "../../type/CategoryType";
import useCategoryIcon from "../../context/useCategoryIcon";

const CategoryList = () => {
  const iconMap = useCategoryIcon();
  const [listCategory, setListCategory] = React.useState([] as CategoryType[]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setListCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="main-block category-list-block">
      <h1 className="title-h2">Category List</h1>
      <p className="page-desc">
        Optimize your financial flow by setting precise limits
      </p>
      <div className="category-list" data-testid="category-list">
        {listCategory.length > 0 &&
          listCategory.map((item, index) => (
            <CategoryCard
              key={index}
              nameCategory={item.name}
              iconCategory={iconMap[item.icon] || iconMap.IoFastFood}
              budgetSpent={item.budgetCurrent}
              budgetMax={item.budgetMax}
              color={item.color}
            />
          ))}
        {listCategory.length === 0 && (
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
