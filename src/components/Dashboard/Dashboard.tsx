import DashboardCard from "./DashboardCard";
import { FaMoneyBills } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import { MdEmojiTransportation } from "react-icons/md";
import CategoryProgressBarCard from "../Category/CategoryProgressBarCard";
import { Link } from "react-router-dom";
import ExpensesCard from "../Expenses/ExpensesCard";
import React, { useEffect } from "react";

const Dashboard = () => {
  const [lastTransactions, setLastTransactions] = React.useState([] as any[]);
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
      color: "#24d0fb",
    },
    {
      nameCategory: "Entertainment",
      iconCategory: <GiPartyPopper />,
      budgetSpent: 150,
      budgetMax: 400,
      color: "#f5a623",
    },
    {
      nameCategory: "Transportation",
      iconCategory: <MdEmojiTransportation />,
      budgetSpent: 100,
      budgetMax: 250,
      color: "#f54e42",
    },
  ];

  /*const dataLastTransactions = [
    {
      id: "1",
      icon: <IoFastFood />,
      description: "Grocery Shopping",
      valueCategory: "Food",
      colorCategory: "#24d0fb",
      currency: "$",
      dateExpense: "2023-07-15",
      montant: 75.5,
    },
    {
      id: "2",
      icon: <GiPartyPopper />,
      description: "Movie Night",
      valueCategory: "Entertainment",
      colorCategory: "#f5a623",
      currency: "$",
      dateExpense: "2023-07-14",
      montant: 30.0,
    },
    {
      id: "3",
      icon: <MdEmojiTransportation />,
      description: "Gas Refill",
      valueCategory: "Transportation",
      colorCategory: "#f54e42",
      currency: "$",
      dateExpense: "2023-07-13",
      montant: 50.0,
    },
  ];*/
  useEffect(() => {
    const fetchLastTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/transactions/last",
        );
        const data = await response.json();
        setLastTransactions(data);
      } catch (error) {
        console.error("Error fetching last transactions:", error);
      }
    };
    fetchLastTransactions();
  }, []);
  return (
    <div className="main-block">
      {cardData.map((data, index) => (
        <DashboardCard key={index} {...data} />
      ))}
      <h2 className="title-h2">Budget Overview</h2>
      <div className="dashboard-category">
        {categoryData.map((data, index) => (
          <CategoryProgressBarCard key={index} {...data} />
        ))}
      </div>
      <div className="dashboard-transaction">
        <div className="dashboard-transaction-top">
          <h2 className="title-h2">Recent Transactions</h2>
          <Link to="/transactions">View All</Link>
        </div>
        <div className="dashboard-transaction-bottom">
          {lastTransactions.map((data, index) => (
            <ExpensesCard key={index} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
