import React from "react";
import { IoAddCircle } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoAnalytics } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { FiUser } from "react-icons/fi";

const Menu = () => {
  const menuItems = [
    { name: "Home", icon: <IoHome />, link: "/" },
    { name: "Analytics", icon: <IoAnalytics />, link: "/analytics" },
    { name: "Add", icon: <IoAddCircle />, link: "/add" },
    { name: "Categories", icon: <MdOutlineCategory />, link: "/categories" },
    { name: "Profile", icon: <FiUser />, link: "/profile" },
  ];

  const [activeItem, setActiveItem] = React.useState("Home");

  // Function to handle item click, set the active item and go to the corresponding link
  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };
  return (
    <div className="menu-block">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className={`menu-link ${activeItem === item.name ? "active" : ""} ${item.name === "Add" ? "link-add" : ""}`}
              onClick={() => handleItemClick(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Menu;
