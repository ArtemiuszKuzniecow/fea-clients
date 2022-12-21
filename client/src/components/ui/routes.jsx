import { Navigate } from "react-router-dom";
import CompaniesPage from "../pages/CompaniesPage";
import CompanyInfoPage from "../pages/CompanyInfoPage";
import CurrentOrdersPage from "../pages/CurrentOrdersPage";
import EditCompanyPage from "../pages/EditCompanyPage";
import MainPage from "../pages/MainPage";
import NewCompanyPage from "../pages/NewCompanyPage";
import NewOrderPage from "../pages/NewOrderPage";
import OrderPage from "../pages/OrderPage";
import OrdersListPage from "../pages/OrdersListPage";
import Login from "./Login/Login";
import LogOut from "./Login/LogOut";
import Registration from "./Login/Registration";

{
  /* <Navigate to="/login" state={{ referrer: location }} />; */
}

const routes = (isLoggedIn, location) => {
  return [
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/logout",
      element: <LogOut />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/companies",
      element: isLoggedIn ? (
        <CompaniesPage />
      ) : (
        <Navigate to="/login" state={{ referrer: location }} />
      ),
    },
    {
      path: "/new-company",
      element: isLoggedIn ? (
        <NewCompanyPage />
      ) : (
        <Navigate to="/login" state={{ referrer: location }} />
      ),
    },
    {
      path: "/new-order",
      element: isLoggedIn ? (
        <NewOrderPage />
      ) : (
        <Navigate to="/login" state={{ referrer: location }} />
      ),
    },
    {
      path: "orders-list",

      children: [
        {
          path: "",
          element: isLoggedIn ? (
            <OrdersListPage />
          ) : (
            <Navigate to="/login" state={{ referrer: location }} />
          ),
        },
        {
          path: ":_id",
          element: <OrderPage />,
        },
      ],
    },
    {
      path: ":id",

      children: [
        {
          path: "",
          element: isLoggedIn ? (
            <CompanyInfoPage />
          ) : (
            <Navigate to="/login" state={{ referrer: location }} />
          ),
        },
        {
          path: "edit",
          element: isLoggedIn ? (
            <EditCompanyPage />
          ) : (
            <Navigate to="/login" state={{ referrer: location }} />
          ),
        },
        {
          path: "orders",
          element: isLoggedIn ? (
            <CurrentOrdersPage />
          ) : (
            <Navigate to="/login" state={{ referrer: location }} />
          ),
        },
      ],
    },
  ];
};

export default routes;
