import type { ExpenseType } from "../type/ExpenseType";

export type ExpenseGroup = {
  label: string;
  expenses: ExpenseType[];
};

export const isSameDate = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

export const getExpenseGroups = (
  expenses: ExpenseType[],
  today: Date,
): ExpenseGroup[] => {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfMonth = new Date(today);
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const groups: ExpenseGroup[] = [
    {
      label: "today",
      expenses: expenses.filter((expense) =>
        isSameDate(new Date(expense.date), today),
      ),
    },
    {
      label: "yesterday",
      expenses: expenses.filter((expense) =>
        isSameDate(new Date(expense.date), yesterday),
      ),
    },
    {
      label: "this month",
      expenses: expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);

        return (
          expenseDate >= startOfMonth &&
          expenseDate <= today &&
          !isSameDate(expenseDate, today) &&
          !isSameDate(expenseDate, yesterday)
        );
      }),
    },
    {
      label: "older",
      expenses: expenses.filter(
        (expense) => new Date(expense.date) < startOfMonth,
      ),
    },
  ];

  return groups.filter((group) => group.expenses.length > 0);
};
