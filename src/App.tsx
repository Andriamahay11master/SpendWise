import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import ExpensesForm from "./components/Expenses/ExpensesForm";
import CategoryList from "./components/Category/CategoryList";
import Profile from "./components/Profile/Profile";

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
          path="/add"
          element={
            <MainPage>
              <ExpensesForm />
            </MainPage>
          }
        />
        <Route
          path="/categories"
          element={
            <MainPage>
              <CategoryList />
            </MainPage>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
