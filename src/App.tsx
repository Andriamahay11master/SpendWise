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
function App() {
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
          path="/addExpense"
          element={
            <MainPage>
              <ExpensesForm />
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
              <Profile />
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
