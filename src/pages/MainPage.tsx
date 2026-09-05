import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import Loader from "../components/Loader/Loader";
import React from "react";

const MainPage = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="main-page">
      <Header />
      <Menu />
      <div className="main-content">{children}</div>
    </div>
  );
};
export default MainPage;
