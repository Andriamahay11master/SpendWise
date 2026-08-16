import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";

interface MainPageGabaritprops {
  icon: React.ReactNode;
  children: React.ReactNode;
  title: string;
}
const MainPageGabarit = ({ icon, children, title }: MainPageGabaritprops) => {
  return (
    <div className="main-page">
      <Header icon={icon} title={title} />
      <Menu />
      <div className="main-content">{children}</div>
    </div>
  );
};
export default MainPageGabarit;
