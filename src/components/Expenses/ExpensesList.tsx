import { GiPartyPopper } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { MdEmojiTransportation } from "react-icons/md";
import ExpensesCard from "./ExpensesCard";
import { CiSearch } from "react-icons/ci";

const ExpensesList = ({}) => {
  const dateToday = new Date();
  const dataExpenses = [
    {
      id: "1",
      icon: <IoFastFood />,
      description: "Grocery Shopping",
      valueCategory: "Food",
      colorCategory: "#24d0fb",
      currency: "$",
      dateExpense: "2026-08-15",
      montant: 75.5,
    },
    {
      id: "2",
      icon: <GiPartyPopper />,
      description: "Movie Night",
      valueCategory: "Entertainment",
      colorCategory: "#f5a623",
      currency: "$",
      dateExpense: "2026-08-14",
      montant: 30.0,
    },
    {
      id: "3",
      icon: <MdEmojiTransportation />,
      description: "Gas Refill",
      valueCategory: "Transportation",
      colorCategory: "#f54e42",
      currency: "$",
      dateExpense: "2026-08-14",
      montant: 50.0,
    },
    {
      id: "4",
      icon: <MdEmojiTransportation />,
      description: "Gas Refill",
      valueCategory: "Transportation",
      colorCategory: "#f54e42",
      currency: "$",
      dateExpense: "2026-08-10",
      montant: 50.0,
    },
  ];
  return (
    <div className="main-block">
      <div className="expenses-filter">
        <label htmlFor="filter">Filter by date:</label>
        <CiSearch />
        <input
          type="search"
          id="filter"
          name="filter"
          placeholder="Search by date"
        />
      </div>
      <div className="expenses-group">
        <h3 className="title-h3">today</h3>
        {dataExpenses.map((expense) => {
          const expenseDate = new Date(expense.dateExpense);
          if (
            expenseDate.getDate() === dateToday.getDate() &&
            expenseDate.getMonth() === dateToday.getMonth() &&
            expenseDate.getFullYear() === dateToday.getFullYear()
          ) {
            return <ExpensesCard key={expense.id} {...expense} />;
          }
        })}
      </div>
      <div className="expenses-group">
        <h3 className="title-h3">yesterday</h3>
        {dataExpenses.map((expense) => {
          const expenseDate = new Date(expense.dateExpense);
          const yesterday = new Date(dateToday);
          yesterday.setDate(yesterday.getDate() - 1);
          if (
            expenseDate.getDate() === yesterday.getDate() &&
            expenseDate.getMonth() === yesterday.getMonth() &&
            expenseDate.getFullYear() === yesterday.getFullYear()
          ) {
            return <ExpensesCard key={expense.id} {...expense} />;
          }
        })}
      </div>
      <div className="expenses-group">
        <h3 className="title-h3">this month</h3>
        {dataExpenses.map((expense) => {
          const expenseDate = new Date(expense.dateExpense);
          // Exclude list of expenses that are already displayed in "today" and "yesterday"
          const yesterday = new Date(dateToday);
          yesterday.setDate(yesterday.getDate() - 1);
          const startOfMonth = new Date(dateToday);
          startOfMonth.setDate(1);
          if (
            expenseDate >= startOfMonth &&
            expenseDate <= dateToday &&
            !(
              (expenseDate.getDate() === dateToday.getDate() &&
                expenseDate.getMonth() === dateToday.getMonth() &&
                expenseDate.getFullYear() === dateToday.getFullYear()) ||
              (expenseDate.getDate() === yesterday.getDate() &&
                expenseDate.getMonth() === yesterday.getMonth() &&
                expenseDate.getFullYear() === yesterday.getFullYear())
            )
          ) {
            return <ExpensesCard key={expense.id} {...expense} />;
          }
        })}
      </div>
    </div>
  );
};

export default ExpensesList;
