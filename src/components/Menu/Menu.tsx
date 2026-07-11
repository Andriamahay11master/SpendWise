import { IoAddCircle } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoAnalytics } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { FiUser } from "react-icons/fi";

const Menu = () => {
  return (
    <div className="menu-block">
      <ul>
        <li>
          <a href="/">
            <IoHome />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/analytics">
            <IoAnalytics />
            <span>Analytics</span>
          </a>
        </li>
        <li>
          <a href="/add">
            <IoAddCircle />
            <span>Add</span>
          </a>
        </li>
        <li>
          <a href="/categories">
            <MdOutlineCategory />
            <span>Categories</span>
          </a>
        </li>
        <li>
          <a href="/profile">
            <FiUser />
            <span>Profile</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Menu;
