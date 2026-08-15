import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router";

interface HeaderProps {
  icon?: React.ReactNode;
  title?: string;
}
const Header = ({
  icon = <GiTakeMyMoney size={30} />,
  title = "SpendWise",
}: HeaderProps) => {
  return (
    <header className="header-block">
      <div className="header-col">
        <Link to="/" className="header-logo">
          {icon}
          <strong>{title}</strong>
        </Link>
      </div>
      <div className="header-col">
        <Link to="/profile" className="header-link">
          <img src="src/assets/profile.png" alt="Profile" />
        </Link>
      </div>
    </header>
  );
};
export default Header;
