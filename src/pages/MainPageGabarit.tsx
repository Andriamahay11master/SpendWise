import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import Loader from "../components/Loader/Loader";
import React from "react";

interface MainPageGabaritprops {
  icon: React.ReactNode;
  children: React.ReactNode;
  title: string;
}
const MainPageGabarit = ({ icon, children, title }: MainPageGabaritprops) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  });
  if (isLoading) return <Loader />;
  return (
    <div className="main-page">
      <Header icon={icon} title={title} />
      <Menu />
      <div className="main-content">{children}</div>
    </div>
  );
};
export default MainPageGabarit;
