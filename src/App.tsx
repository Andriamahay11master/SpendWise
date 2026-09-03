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
  const saveExpense = async (formData: {
    amount: string;
    category: string;
    iconCategory: string;
    colorCategory: string;
    dateE: string;
    notes: string;
  }) => {
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
