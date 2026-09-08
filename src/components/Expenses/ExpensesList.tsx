import ExpensesCard from "./ExpensesCard";
import { CiSearch } from "react-icons/ci";
import React, { useMemo } from "react";
import type { ExpenseType } from "../../type/ExpenseType";
import useCategoryIcon from "../../context/useCategoryIcon";
import { getExpenseGroups } from "../../utils/expenseGroups";
import { useQuery } from "@tanstack/react-query";

// Fetch expenses from the API
const fetchExpenses = async (): Promise<ExpenseType[]> => {
  const response = await fetch("http://localhost:5000/api/expenses");

  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }

  return await response.json();
};

const ExpensesList = () => {
  const iconMap = useCategoryIcon();
  const today = useMemo(() => new Date(), []);
  const [dateSearch, setDateSearch] = React.useState("");
  const { data: dataExpenses } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const filteredExpenses = useMemo(() => {
    const expenses = dataExpenses ?? [];

    if (!dateSearch) {
      return expenses;
    }

    const searchDate = new Date(dateSearch);
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === searchDate.getFullYear() &&
        expenseDate.getMonth() === searchDate.getMonth() &&
        expenseDate.getDate() === searchDate.getDate()
      );
    });
  }, [dataExpenses, dateSearch]);

  const expenseGroups = useMemo(
    () => getExpenseGroups(filteredExpenses, today),
    [filteredExpenses, today],
  );

  const onChangeDateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateSearch(e.target.value);
  };

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

      {filteredExpenses.length === 0 && (
        <div className="no-expenses">
          <p>No expenses found for the selected date.</p>
        </div>
      )}
    </div>
  );
};

export default ExpensesList;
