import DashboardCard from "./DashboardCard";
import { FaMoneyBills } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import { MdEmojiTransportation } from "react-icons/md";
import CategoryProgressBarCard from "../Category/CategoryProgressBarCard";

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

  const categoryData = [
    {
      nameCategory: "Food",
      iconCategory: <IoFastFood />,
      budgetSpent: 220,
      budgetMax: 500,
    },
    {
      nameCategory: "Entertainment",
      iconCategory: <GiPartyPopper />,
      budgetSpent: 150,
      budgetMax: 400,
    },
    {
      nameCategory: "Transportation",
      iconCategory: <MdEmojiTransportation />,
      budgetSpent: 100,
      budgetMax: 250,
    },
  ];
  return (
    <div className="dashboard-block">
      {cardData.map((data, index) => (
        <DashboardCard key={index} {...data} />
      ))}
      <h2 className="title-h2">Budget Overview</h2>
      <div className="dashboard-category">
        {categoryData.map((data, index) => (
          <CategoryProgressBarCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
