import { IoAddCircle } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoAnalytics } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { Link } from "@tanstack/react-router";

const Menu = () => {
  const menuItems = [
    { name: "Home", icon: <IoHome />, link: "/" },
    { name: "Analytics", icon: <IoAnalytics />, link: "/analytics" },
    { name: "Add", icon: <IoAddCircle />, link: "/addExpense" },
    {
      name: "Categories",
      icon: <MdOutlineCategory />,
      link: "/listCategories",
    },
    { name: "Profile", icon: <FiUser />, link: "/profile" },
    { name: "Budget", icon: <FiSettings />, link: "/budget" },
  ];

  return (
    <div className="menu-block">
      <ul>
        {menuItems.map((item) => (
          <li key={item.link}>
            <Link
              to={item.link}
              activeOptions={{ exact: item.link === "/" }}
              activeProps={{ className: "active" }}
              className={`menu-link ${item.name === "Add" ? "link-add" : ""}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Menu;
