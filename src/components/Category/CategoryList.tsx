import { GiPartyPopper } from "react-icons/gi";
import { IoAddCircle, IoFastFood } from "react-icons/io5";
import { MdEmojiTransportation } from "react-icons/md";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router";

const CategoryList = () => {
  const data = [
    {
      nameCategory: "Food",
      iconCategory: <IoFastFood />,
      budgetSpent: 250,
      budgetMax: 500,
      color: "#24d0fb",
    },
    {
      nameCategory: "Entertainment",
      iconCategory: <GiPartyPopper />,
      budgetSpent: 300,
      budgetMax: 750,
      color: "#f5a623",
    },
    {
      nameCategory: "Transportation",
      iconCategory: <MdEmojiTransportation />,
      budgetSpent: 150,
      budgetMax: 500,
      color: "#f54e42",
    },
  ];
  return (
    <div className="main-block category-list-block">
      <h1 className="title-h2">Category List</h1>
      <p className="page-desc">
        Optimize your financial flow by setting precise limits
      </p>
      <div className="category-list" data-testid="category-list">
        {data.map((item, index) => (
          <CategoryCard
            key={index}
            nameCategory={item.nameCategory}
            iconCategory={item.iconCategory}
            budgetSpent={item.budgetSpent}
            budgetMax={item.budgetMax}
            color={item.color}
          />
        ))}
      </div>
      <Link className="btn btn-primary" to="/addCategory">
        <IoAddCircle />
        add new category
      </Link>
    </div>
  );
};
export default CategoryList;
