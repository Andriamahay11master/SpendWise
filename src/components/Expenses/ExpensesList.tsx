import ExpensesCard from "./ExpensesCard";
import { CiSearch } from "react-icons/ci";
import React, { useEffect, useMemo } from "react";
import type { ExpenseType } from "../../type/ExpenseType";
import useCategoryIcon from "../../context/useCategoryIcon";
import { getExpenseGroups } from "../../utils/expenseGroups";

const ExpensesList = () => {
  const iconMap = useCategoryIcon();
  const today = useMemo(() => new Date(), []);
  const [dateSearch, setDateSearch] = React.useState("");
  const [dataExpenses, setDataExpenses] = React.useState<ExpenseType[]>([]);

  const expenseGroups = useMemo(
    () => getExpenseGroups(dataExpenses, today),
    [dataExpenses, today],
  );

  const onChangeDateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateSearch(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((response) => response.json() as Promise<ExpenseType[]>)
      .then((data) => {
        if (!dateSearch) {
          setDataExpenses(data);
          return;
        }

        const searchDate = new Date(dateSearch);
        const filteredData = data.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate.getDate() === searchDate.getDate() &&
            expenseDate.getMonth() === searchDate.getMonth() &&
            expenseDate.getFullYear() === searchDate.getFullYear()
          );
        });

        setDataExpenses(filteredData);
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

      {expenseGroups.map((group) => (
        <div className="expenses-group" key={group.label}>
          <h3 className="title-h3">{group.label}</h3>
          {group.expenses.map((expense) => (
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
          ))}
        </div>
      ))}

      {dataExpenses.length === 0 && (
        <div className="no-expenses">
          <p>No expenses found for the selected date.</p>
        </div>
      )}
    </div>
  );
};

export default ExpensesList;
