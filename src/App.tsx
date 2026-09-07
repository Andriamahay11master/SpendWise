import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import ExpensesForm from "./components/Expenses/ExpensesForm";
import CategoryList from "./components/Category/CategoryList";
import Profile from "./components/Profile/Profile";
import MainPageGabarit from "./pages/MainPageGabarit";
import ExpensesList from "./components/Expenses/ExpensesList";
import CategoryForm from "./components/Category/CategoryForm";

import { GoArrowLeft } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";
import Report from "./components/Report/Report";

function App() {
  const getLastBudgetForCategory = async (categoryId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${categoryId}/budgetCurrent`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch budgetCurrent");
      }
      const data = await response.json();
      return data.budgetCurrent;
    } catch (error) {
      console.error("Error fetching budgetCurrent:", error);
      return null;
    }
  };

  const updateBudgetForCategory = async (
    categoryId: string,
    newBudgetCurrent: number,
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${categoryId}/budgetCurrent`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ budgetCurrent: newBudgetCurrent }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to update budgetCurrent");
      }
    } catch (error) {
      console.error("Error updating budgetCurrent:", error);
    }
  };
  const saveExpense = async (formData: {
    amount: string;
    category: string;
    iconCategory: string;
    colorCategory: string;
    dateE: string;
    notes: string;
  }) => {
    const lastBudget = await getLastBudgetForCategory(formData.category);
    if (lastBudget !== null) {
      const newBudgetCurrent = lastBudget + Number(formData.amount);
      await updateBudgetForCategory(formData.category, newBudgetCurrent);
    }
    await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: formData.amount,
        category: formData.category,
        date: formData.dateE,
        notes: formData.notes,
        icon: formData.iconCategory,
        colorCategory: formData.colorCategory,
      }),
    });
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage>
              <Dashboard />
            </MainPage>
          }
        />
        <Route
          path="/analytics"
          element={
            <MainPage>
              <Analytics />
            </MainPage>
          }
        />
        <Route
          path="/report"
          element={
            <MainPage>
              <Report />
            </MainPage>
          }
        />
        <Route
          path="/addExpense"
          element={
            <MainPage>
              <ExpensesForm onSubmit={saveExpense} />
            </MainPage>
          }
        />
        <Route
          path="/listCategories"
          element={
            <MainPage>
              <CategoryList />
            </MainPage>
          }
        />
        <Route
          path="/addCategory"
          element={
            <MainPageGabarit
              icon={<FaAngleLeft size={30} />}
              title="Add Category"
            >
              <CategoryForm />
            </MainPageGabarit>
          }
        />
        <Route
          path="/profile"
          element={
            <MainPage>
              <Profile
                image="/user.png"
                name="Name user"
                email="user@email.com"
              />
            </MainPage>
          }
        />
        <Route
          path="/transactions"
          element={
            <MainPageGabarit
              icon={<GoArrowLeft size={30} />}
              title="Transactions"
            >
              <ExpensesList />
            </MainPageGabarit>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
