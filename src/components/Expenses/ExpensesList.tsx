import ExpensesCard from "./ExpensesCard";
import { CiSearch } from "react-icons/ci";
import React, { useEffect } from "react";
import type { ExpenseType } from "../../type/ExpenseType";
import useCategoryIcon from "../../context/useCategoryIcon";

const ExpensesList = ({}) => {
  const iconMap = useCategoryIcon();
  const dateToday = new Date();
  const [dateSearch, setDateSearch] = React.useState("");
  const [dataExpenses, setDataExpenses] = React.useState<ExpenseType[]>([]);
  const onChangeDateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateSearch(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((response) => response.json() as Promise<ExpenseType[]>)
      .then((data) => {
        if (dateSearch) {
          const filteredData = data.filter((expense) => {
            const expenseDate = new Date(expense.date);
            const searchDate = new Date(dateSearch);
            return (
              expenseDate.getDate() === searchDate.getDate() &&
              expenseDate.getMonth() === searchDate.getMonth() &&
              expenseDate.getFullYear() === searchDate.getFullYear()
            );
          });
          setDataExpenses(filteredData);
        } else {
          setDataExpenses(data);
        }
      });
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
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getDate() === dateToday.getDate() &&
          expenseDate.getMonth() === dateToday.getMonth() &&
          expenseDate.getFullYear() === dateToday.getFullYear()
        );
      }) ? (
        <div className="expenses-group">
          <h3 className="title-h3">today</h3>
          {dataExpenses.map((expense) => {
            const expenseDate = new Date(expense.date);
            if (
              expenseDate.getDate() === dateToday.getDate() &&
              expenseDate.getMonth() === dateToday.getMonth() &&
              expenseDate.getFullYear() === dateToday.getFullYear()
            ) {
              return (
                <ExpensesCard
                  key={expense.id}
                  id={expense.id}
                  valueCategory={expense.category}
                  currency={expense.currency}
                  description={expense.notes}
                  montant={expense.amount}
                  dateExpense={expense.date}
                  colorCategory={expense.colorCategory}
                  icon={iconMap[expense.icon]}
                />
              );
            }
          })}
        </div>
      ) : null}
      {dataExpenses.some((expense) => {
        const expenseDate = new Date(expense.date);
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
            const expenseDate = new Date(expense.date);
            const yesterday = new Date(dateToday);
            yesterday.setDate(yesterday.getDate() - 1);
            if (
              expenseDate.getDate() === yesterday.getDate() &&
              expenseDate.getMonth() === yesterday.getMonth() &&
              expenseDate.getFullYear() === yesterday.getFullYear()
            ) {
              return (
                <ExpensesCard
                  key={expense.id}
                  id={expense.id}
                  valueCategory={expense.category}
                  currency={expense.currency}
                  description={expense.notes}
                  montant={expense.amount}
                  dateExpense={expense.date}
                  colorCategory={expense.colorCategory}
                  icon={iconMap[expense.icon]}
                />
              );
            }
          })}
        </div>
      ) : null}
      {dataExpenses.some((expense) => {
        const expenseDate = new Date(expense.date);
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
            const expenseDate = new Date(expense.date);
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
              return (
                <ExpensesCard
                  key={expense.id}
                  id={expense.id}
                  valueCategory={expense.category}
                  currency={expense.currency}
                  description={expense.notes}
                  montant={expense.amount}
                  dateExpense={expense.date}
                  colorCategory={expense.colorCategory}
                  icon={iconMap[expense.icon]}
                />
              );
            }
          })}
        </div>
      ) : null}
      {dataExpenses.some((expense) => {
        const expenseDate = new Date(expense.date);
        const startOfMonth = new Date(dateToday);
        startOfMonth.setDate(1);
        return expenseDate < startOfMonth;
      }) ? (
        <div className="expenses-group">
          <h3 className="title-h3">older</h3>
          {dataExpenses.map((expense) => {
            const expenseDate = new Date(expense.date);
            const startOfMonth = new Date(dateToday);
            startOfMonth.setDate(1);
            if (expenseDate < startOfMonth) {
              return (
                <ExpensesCard
                  key={expense.id}
                  id={expense.id}
                  valueCategory={expense.category}
                  currency={expense.currency}
                  description={expense.notes}
                  montant={expense.amount}
                  dateExpense={expense.date}
                  colorCategory={expense.colorCategory}
                  icon={iconMap[expense.icon]}
                />
              );
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
