import DashboardCard from "./DashboardCard";
import { FaMoneyBills } from "react-icons/fa6";

const Dashboard = () => {
  const cardData = [
    {
      typeCard: 1,
      title: "Total Balance",
      currency: "$",
      icon: <FaMoneyBills />,
      value: 7548.453,
      desc: "weekly growth",
      color: "#47f64d",
    },
    {
      typeCard: 2,
      title: "Monthly Spending",
      currency: "$",
      value: 4210,
      desc: "on track to stay within budget",
      limit: 5000,
      color: "#24d0fb",
    },
  ];
  return (
    <div className="dashboard-block">
      {cardData.map((data, index) => (
        <DashboardCard key={index} {...data} />
      ))}
      <h2 className="title-h2">Budget Overview</h2>
      <div className="dashboard-category"></div>
    </div>
  );
};
export default Dashboard;
