import { StrictMode } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
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
import Budget from "./components/Budget/Budget";
import { GoArrowLeft } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";

const rootRoute = createRootRoute({
  component: App,
});

const createMainPageRoute = <const TPath extends string>(
  path: TPath,
  page: ReactNode,
) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => <MainPage>{page}</MainPage>,
  });

const createGabaritRoute = <const TPath extends string>(
  path: TPath,
  title: string,
  icon: ReactNode,
  page: ReactNode,
) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => (
      <MainPageGabarit icon={icon} title={title}>
        {page}
      </MainPageGabarit>
    ),
  });

const createPlaceholderRoute = <const TPath extends string>(
  path: TPath,
  label: string,
) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => <div>{label} coming soon</div>,
  });

const indexRoute = createMainPageRoute("/", <Dashboard />);
const analyticsRoute = createMainPageRoute("/analytics", <Analytics />);
const reportRoute = createMainPageRoute("/report", <Report />);
const budgetRoute = createMainPageRoute("/budget", <Budget />);
const addExpenseRoute = createMainPageRoute("/addExpense", <ExpensesForm />);
const categoriesRoute = createMainPageRoute(
  "/listCategories",
  <CategoryList />,
);
const profileRoute = createMainPageRoute(
  "/profile",
  <Profile image="/user.png" name="Name user" email="user@email.com" />,
);

const addCategoryRoute = createGabaritRoute(
  "/addCategory",
  "Add Category",
  <FaAngleLeft size={30} />,
  <CategoryForm />,
);
const transactionsRoute = createGabaritRoute(
  "/transactions",
  "Transactions",
  <GoArrowLeft size={30} />,
  <ExpensesList />,
);

const expenseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/expenses/$id",
  component: () => <div>Expense detail coming soon</div>,
});
const categoryReportRoute = createPlaceholderRoute(
  "/categoryReport",
  "Category report",
);
const predictionRoute = createPlaceholderRoute("/prediction", "Prediction");
const profileInfoRoute = createPlaceholderRoute(
  "/profil/info/$name",
  "Profile info",
);
const profilePasswordRoute = createPlaceholderRoute(
  "/profil/password/$name",
  "Profile password",
);

const routeTree = rootRoute.addChildren([
  indexRoute,
  analyticsRoute,
  reportRoute,
  budgetRoute,
  addExpenseRoute,
  categoriesRoute,
  addCategoryRoute,
  profileRoute,
  transactionsRoute,
  expenseDetailRoute,
  categoryReportRoute,
  predictionRoute,
  profileInfoRoute,
  profilePasswordRoute,
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
