import { GiPartyPopper } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { MdEmojiTransportation } from "react-icons/md";
import ExpensesCard from "./ExpensesCard";
import { CiSearch } from "react-icons/ci";
import React, { useEffect } from "react";

const ExpensesList = ({}) => {
  const dateToday = new Date();
  const dataExp = [
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
    {
      id: "5",
      icon: <IoFastFood />,
      description: "Grocery Shopping",
      valueCategory: "Food",
      colorCategory: "#24d0fb",
      currency: "$",
      dateExpense: "2025-08-15",
      montant: 75.5,
    },
    {
      id: "6",
      icon: <GiPartyPopper />,
      description: "Movie Night",
      valueCategory: "Entertainment",
      colorCategory: "#f5a623",
      currency: "$",
      dateExpense: "2025-08-14",
      montant: 30.0,
    },
  ];
  const [dateSearch, setDateSearch] = React.useState(
    dateToday.toISOString().split("T")[0],
  );
  const [dataExpenses, setDataExpenses] = React.useState(dataExp);
  const onChangeDateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateSearch(e.target.value);
  };

  useEffect(() => {
    if (dateSearch === "") {
      setDataExpenses(dataExp);
    } else {
      const filteredExpenses = dataExp.filter((expense) => {
        const expenseDate = new Date(expense.dateExpense);
        const searchDate = new Date(dateSearch);
        return (
          expenseDate.getFullYear() === searchDate.getFullYear() &&
          expenseDate.getMonth() === searchDate.getMonth() &&
          expenseDate.getDate() === searchDate.getDate()
        );
      });
      setDataExpenses(filteredExpenses);
    }
  }, [dateSearch]);

  return (
    <div className="main-block">
      <div className="expenses-filter">
        <CiSearch />
        <input
          type="date"
          id="filter"
          name="filter"
          placeholder="Search by year, month, day"
          value={dateSearch}
          onChange={onChangeDateSearch}
        />
      </div>
      {dataExpenses.some((expense) => {
        const expenseDate = new Date(expense.dateExpense);
        return (
          expenseDate.getDate() === dateToday.getDate() &&
          expenseDate.getMonth() === dateToday.getMonth() &&
          expenseDate.getFullYear() === dateToday.getFullYear()
        );
      }) ? (
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
      ) : null}
      {dataExpenses.some((expense) => {
        const expenseDate = new Date(expense.dateExpense);
        const yesterday = new Date(dateToday);
        yesterday.setDate(yesterday.getDate() - 1);
        return (
          expenseDate.getDate() === yesterday.getDate() &&
          expenseDate.getMonth() === yesterday.getMonth() &&
          expenseDate.getFullYear() === yesterday.getFullYear()
        );
      }) ? (
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
      ) : null}
      {dataExpenses.some((expense) => {
        const expenseDate = new Date(expense.dateExpense);
        const yesterday = new Date(dateToday);
        yesterday.setDate(yesterday.getDate() - 1);
        const startOfMonth = new Date(dateToday);
        startOfMonth.setDate(1);
        return (
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
        );
      }) ? (
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
      ) : null}
      {dataExpenses.some((expense) => {
        const expenseDate = new Date(expense.dateExpense);
        const startOfMonth = new Date(dateToday);
        startOfMonth.setDate(1);
        return expenseDate < startOfMonth;
      }) ? (
        <div className="expenses-group">
          <h3 className="title-h3">older</h3>
          {dataExpenses.map((expense) => {
            const expenseDate = new Date(expense.dateExpense);
            const startOfMonth = new Date(dateToday);
            startOfMonth.setDate(1);
            if (expenseDate < startOfMonth) {
              return <ExpensesCard key={expense.id} {...expense} />;
            }
          })}
        </div>
      ) : null}
      {dataExpenses.length === 0 && (
        <div className="no-expenses">
          <p>No expenses found for the selected date.</p>
        </div>
      )}
    </div>
  );
};

export default ExpensesList;
