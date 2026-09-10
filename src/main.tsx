import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "./pages/MainPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import ExpensesForm from "./components/Expenses/ExpensesForm";
import CategoryList from "./components/Category/CategoryList";
import Profile from "./components/Profile/Profile";
import MainPageGabarit from "./pages/MainPageGabarit";
import ExpensesList from "./components/Expenses/ExpensesList";
import CategoryForm from "./components/Category/CategoryForm";
import Report from "./components/Report/Report";
import { GoArrowLeft } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <MainPage>
      <Dashboard />
    </MainPage>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: () => (
    <MainPage>
      <Analytics />
    </MainPage>
  ),
});

const reportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/report",
  component: () => (
    <MainPage>
      <Report />
    </MainPage>
  ),
});

const addExpenseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/addExpense",
  component: () => (
    <MainPage>
      <ExpensesForm />
    </MainPage>
  ),
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listCategories",
  component: () => (
    <MainPage>
      <CategoryList />
    </MainPage>
  ),
});

const addCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/addCategory",
  component: () => (
    <MainPageGabarit icon={<FaAngleLeft size={30} />} title="Add Category">
      <CategoryForm />
    </MainPageGabarit>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <MainPage>
      <Profile image="/user.png" name="Name user" email="user@email.com" />
    </MainPage>
  ),
});

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/transactions",
  component: () => (
    <MainPageGabarit icon={<GoArrowLeft size={30} />} title="Transactions">
      <ExpensesList />
    </MainPageGabarit>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  analyticsRoute,
  reportRoute,
  addExpenseRoute,
  categoriesRoute,
  addCategoryRoute,
  profileRoute,
  transactionsRoute,
]);

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
