import { GiPartyPopper } from "react-icons/gi";
import { IoAddCircle, IoFastFood } from "react-icons/io5";
import { MdEmojiTransportation } from "react-icons/md";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { CiMobile4 } from "react-icons/ci";
import { CiPlane } from "react-icons/ci";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router";
import React from "react";
import type { ReactElement } from "react";
import type { CategoryType } from "../../type/CategoryType";

interface CategoryIconProps {
  color?: string;
}

const iconMap: Record<string, ReactElement<CategoryIconProps>> = {
  IoFastFood: <IoFastFood />,
  GiPartyPopper: <GiPartyPopper />,
  MdEmojiTransportation: <MdEmojiTransportation />,
  MdOutlineHealthAndSafety: <MdOutlineHealthAndSafety />,
  TiShoppingCart: <TiShoppingCart />,
  CiMobile4: <CiMobile4 />,
  CiPlane: <CiPlane />,
};

const CategoryList = () => {
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
