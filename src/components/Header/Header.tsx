import { GiTakeMyMoney } from "react-icons/gi";
import { Link, useNavigate } from "@tanstack/react-router";
import useConnectUser from "../../context/useConnectUser";
import { AiOutlineLogout } from "react-icons/ai";
import defaultUserImage from "../../assets/user.png";

interface HeaderProps {
  icon?: React.ReactNode;
  title?: string;
}
const Header = ({
  icon = <GiTakeMyMoney size={30} />,
  title = "SpendWise",
}: HeaderProps) => {
  const { user, logout } = useConnectUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    void navigate({ to: "/login", replace: true });
  };

  const profileImage = user?.avatar
    ? `http://localhost:5000/uploads/${user.avatar}`
    : defaultUserImage;

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
          {user && <span className="header-profil-name">{user.username}</span>}
          <img src={profileImage} alt={`Profile ${user?.username}`} />
        </Link>
        <button
          type="button"
          className="btn btn-link"
          aria-label="Log out"
          onClick={handleLogout}
        >
          <AiOutlineLogout />
        </button>
      </div>
    </header>
  );
};
export default Header;
