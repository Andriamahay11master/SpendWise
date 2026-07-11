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
          <a href="/" className="menu-link active">
            <IoHome />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/analytics" className="menu-link">
            <IoAnalytics />
            <span>Analytics</span>
          </a>
        </li>
        <li>
          <a href="/add" className="menu-link">
            <IoAddCircle />
            <span>Add</span>
          </a>
        </li>
        <li>
          <a href="/categories" className="menu-link">
            <MdOutlineCategory />
            <span>Categories</span>
          </a>
        </li>
        <li>
          <a href="/profile" className="menu-link">
            <FiUser />
            <span>Profile</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Menu;
