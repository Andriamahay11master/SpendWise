import DashboardCard from "./DashboardCard";
import { FaMoneyBills } from "react-icons/fa6";
import CategoryProgressBarCard from "../Category/CategoryProgressBarCard";
import { Link } from "@tanstack/react-router";
import ExpensesCard from "../Expenses/ExpensesCard";
import type { ExpenseType } from "../../type/ExpenseType";
import type { CategoryType } from "../../type/CategoryType";
import useCategoryIcon from "../../context/useCategoryIcon";
import { useQuery } from "@tanstack/react-query";

// Fetch last transactions from the API
const fetchLastTransactions = async () => {
  const response = await fetch("http://localhost:5000/api/transactions/last");
  return await response.json();
};

// Fetch total week spending
const fetchTotalWeekSpending = async () => {
  const response = await fetch("http://localhost:5000/api/expenses/total/week");
  return await response.json();
};

// Fetch total month spending
const fetchTotalMonthSpending = async () => {
  const response = await fetch(
    "http://localhost:5000/api/expenses/total/month",
  );
  return await response.json();
};

// Fetch categories
const fetchCategories = async () => {
  const response = await fetch("http://localhost:5000/api/categories");
  return await response.json();
};

// Fetch Budget
const fetchBudget = async () => {
  const response = await fetch("http://localhost:5000/api/budget/current");
  return await response.json();
};

const Dashboard = () => {
  const iconMap = useCategoryIcon();
  const { data: lastTransactions } = useQuery({
    queryKey: ["lastTransactions"],
    queryFn: fetchLastTransactions,
  });
  const { data: totalWeekSpendingData } = useQuery({
    queryKey: ["totalWeekSpending"],
    queryFn: fetchTotalWeekSpending,
  });
  const { data: totalMonthSpendingData } = useQuery({
    queryKey: ["totalMonthSpending"],
    queryFn: fetchTotalMonthSpending,
  });
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const { data: budgetMonthly } = useQuery({
    queryKey: ["budget"],
    queryFn: fetchBudget,
  });
  const totalWeekSpending = totalWeekSpendingData?.totalExpenses || 0;
  const totalMonthSpending = totalMonthSpendingData?.totalExpenses || 0;
  const limitMonthlyBudget = Number(budgetMonthly?.budget ?? 0);
  const monthlyBudgetCurrency = budgetMonthly?.currency ?? "$";

  const kpiData = [
    {
      typeCard: 1,
      title: "Total Balance",
      currency: monthlyBudgetCurrency,
      icon: <FaMoneyBills />,
      value: totalWeekSpending,
      desc: "weekly growth",
      color: "#47f64d",
    },
    {
      typeCard: 2,
      title: "Monthly Spending",
      currency: monthlyBudgetCurrency,
      value: totalMonthSpending,
      desc: "on track to stay within budget",
      limit: limitMonthlyBudget,
      color: "#24d0fb",
    },
  ];

  return (
    <div className="main-block">
      {kpiData.map((data, index) => (
        <DashboardCard key={index} {...data} />
      ))}
      <h2 className="title-h2">Budget Overview</h2>
      <div className="dashboard-category">
        {categoriesData?.map((data: CategoryType, index: number) => (
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
          {lastTransactions?.map((data: ExpenseType, index: number) => (
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
