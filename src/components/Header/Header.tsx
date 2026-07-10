import { GiTakeMyMoney } from "react-icons/gi";

const Header = () => {
  return (
    <header className="header-block">
      <div className="header-col">
        <p className="header-logo">
          <GiTakeMyMoney />
          <strong>SpendWise</strong>
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
