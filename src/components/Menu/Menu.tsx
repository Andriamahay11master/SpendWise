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

  return (
    <div className="menu-block">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className={`menu-link ${item.name === "Home" ? "active" : ""} ${item.name === "Add" ? "link-add" : ""}`}
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
