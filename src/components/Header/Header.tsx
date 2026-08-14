import { GiTakeMyMoney } from "react-icons/gi";

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
        <p className="header-logo">
          {icon}
          <strong>{title}</strong>
        </p>
      </div>
      <div className="header-col">
        <a href="/profil" className="header-link">
          <img src="src/assets/profile.png" alt="Profile" />
        </a>
      </div>
    </header>
  );
};
export default Header;
