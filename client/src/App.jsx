import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AppLoader from "./components/HOC/AppLoader";
import CompaniesPage from "./components/pages/CompaniesPage";
import CompanyInfoPage from "./components/pages/CompanyInfoPage";
import CurrentOrdersPage from "./components/pages/CurrentOrdersPage";
import EditCompanyPage from "./components/pages/EditCompanyPage";
import MainPage from "./components/pages/MainPage";
import NewCompanyPage from "./components/pages/NewCompanyPage";
import NewOrderPage from "./components/pages/NewOrderPage";
import OrderPage from "./components/pages/OrderPage";
import OrdersListPage from "./components/pages/OrdersListPage";
import Login from "./components/ui/Login/Login";
import LogOut from "./components/ui/Login/LogOut";
import Registration from "./components/ui/Login/Registration";
import PageLayout from "./layouts/PageLayout";

function App() {
  return (
    <AppLoader>
      <BrowserRouter>
        <PageLayout>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/registration" component={Registration} />

            <ProtectedRoute path="/companies" exact component={CompaniesPage} />
            <ProtectedRoute
              path="/new-company"
              exact
              component={NewCompanyPage}
            />
            <ProtectedRoute path="/new-order" component={NewOrderPage} />
            <ProtectedRoute
              path="/orders-list"
              exact
              component={OrdersListPage}
            />
            <ProtectedRoute path="/orders-list/:_id" component={OrderPage} />
            <ProtectedRoute
              path="/:_id/orders"
              exact
              component={CurrentOrdersPage}
            />
            <ProtectedRoute path="/:_id" exact component={CompanyInfoPage} />
            <ProtectedRoute
              path="/:_id/edit"
              exact
              component={EditCompanyPage}
            />
          </Switch>
        </PageLayout>
      </BrowserRouter>
    </AppLoader>
  );
}

export default App;
