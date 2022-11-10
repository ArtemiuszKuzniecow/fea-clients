import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import localStorageService from "./assets/services/localStorageService";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import AppLoader from "./components/HOC/AppLoader";
import CompaniesPage from "./components/pages/CompaniesPage/CompaniesPage";
import CompanyInfoPage from "./components/pages/CompanyInfoPage/CompanyInfoPage";
import MainPage from "./components/pages/MainPage/MainPage";
import NewCompanyPage from "./components/pages/NewCompanyPage/NewCompanyPage";
import NewOrderPage from "./components/pages/NewOrderPage/NewOrderPage";
import OrderPage from "./components/pages/OrderPage/OrderPage";
import OrdersListPage from "./components/pages/OrdersListPage/OrdersListPage";
import Login from "./components/ui/Login/Login";
import LogOut from "./components/ui/Login/LogOut";
import Registration from "./components/ui/Login/Registration";
import PageLayout from "./layouts/PageLayout/PageLayout";
import { loadUserData } from "./store/Users/actions";
import { getLoggedInStatusSelector } from "./store/Users/selectors";

function App() {
  const localId = localStorageService.getUserId();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getLoggedInStatusSelector());

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUserData(localId));
    }
  }, [localId]);

  return (
    <div className="App">
      <AppLoader>
        <BrowserRouter>
          <PageLayout>
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/login" exact component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/registration" component={Registration} />

              <ProtectedRoute path="/companies" component={CompaniesPage} />
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
              <ProtectedRoute path="/orders-list/:id" component={OrderPage} />
              <ProtectedRoute path="/:id" exact component={CompanyInfoPage} />
            </Switch>
          </PageLayout>
        </BrowserRouter>
      </AppLoader>
    </div>
  );
}

export default App;
