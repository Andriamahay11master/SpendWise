import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import { GoArrowLeft } from "react-icons/go";

const MainPageTransaction = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-page">
      <Header
        icon={<GoArrowLeft size={30} />}
        title="Transactions"
        type="transaction"
      />
      <Menu />
      <div className="main-content">{children}</div>
    </div>
  );
};
export default MainPageTransaction;
