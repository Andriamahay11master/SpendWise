import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";

const MainPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-page">
      <Header />
      <Menu />
      <div className="main-content">{children}</div>
    </div>
  );
};
export default MainPage;
