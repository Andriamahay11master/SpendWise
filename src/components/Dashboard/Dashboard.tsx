import DashboardCard from "./DashboardCard";
import { FaMoneyBills } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import {
  MdEmojiTransportation,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import CategoryProgressBarCard from "../Category/CategoryProgressBarCard";
import { Link } from "react-router-dom";
import ExpensesCard from "../Expenses/ExpensesCard";
import React, { useEffect, type ReactElement } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { CiMobile4, CiPlane } from "react-icons/ci";
import type { ExpenseType } from "../../type/ExpenseType";
import type { CategoryType } from "../../type/CategoryType";

const Dashboard = () => {
  const [lastTransactions, setLastTransactions] = React.useState(
    [] as ExpenseType[],
  );
  const [categories, setCategories] = React.useState([] as CategoryType[]);
  const [totalWeekSpending, setTotalWeekSpending] = React.useState(0);
  const [totalMonthSpending, setTotalMonthSpending] = React.useState(0);
  const kpiData = [
    {
      typeCard: 1,
      title: "Total Balance",
      currency: "$",
      icon: <FaMoneyBills />,
      value: totalWeekSpending,
      desc: "weekly growth",
      color: "#47f64d",
    },
    {
      typeCard: 2,
      title: "Monthly Spending",
      currency: "$",
      value: totalMonthSpending,
      desc: "on track to stay within budget",
      limit: 5000,
      color: "#24d0fb",
    },
  ];

  interface CategoryIconProps {
    color?: string;
  }

  const iconMap: Record<string, ReactElement<CategoryIconProps>> = {
    IoFastFood: <IoFastFood />,
    GiPartyPopper: <GiPartyPopper />,
    MdEmojiTransportation: <MdEmojiTransportation />,
    MdOutlineHealthAndSafety: <MdOutlineHealthAndSafety />,
    TiShoppingCart: <TiShoppingCart />,
    CiMobile4: <CiMobile4 />,
    CiPlane: <CiPlane />,
  };

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

    const fetchTotalWeekSpending = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/expenses/total/week",
        );
        const data = await response.json();
        setTotalWeekSpending(data.totalExpenses);
      } catch (error) {
        console.error("Error fetching total week spending:", error);
      }
    };

    const fetchTotalMonthSpending = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/expenses/total/month",
        );
        const data = await response.json();
        setTotalMonthSpending(data.totalExpenses);
      } catch (error) {
        console.error("Error fetching total month spending:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    fetchLastTransactions();
    fetchTotalWeekSpending();
    fetchTotalMonthSpending();
  }, []);
  return (
    <div className="main-block">
      {kpiData.map((data, index) => (
        <DashboardCard key={index} {...data} />
      ))}
      <h2 className="title-h2">Budget Overview</h2>
      <div className="dashboard-category">
        {categories.map((data, index) => (
          <CategoryProgressBarCard
            key={index}
            budgetMax={data.budgetMax}
            color={data.color}
            currency={data.currency}
            nameCategory={data.name}
            iconCategory={iconMap[data.icon]}
            budgetSpent={data.budgetCurrent}
          />
        ))}
      </div>
      <div className="dashboard-transaction">
        <div className="dashboard-transaction-top">
          <h2 className="title-h2">Recent Transactions</h2>
          <Link to="/transactions">View All</Link>
        </div>
        <div className="dashboard-transaction-bottom">
          {lastTransactions.map((data, index) => (
            <ExpensesCard
              key={index}
              id={data.id}
              icon={iconMap[data.icon] || iconMap.IoFastFood}
              description={data.notes}
              valueCategory={data.category}
              colorCategory={data.colorCategory}
              dateExpense={data.date}
              currency={data.currency}
              montant={data.amount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
