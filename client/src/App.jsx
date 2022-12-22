import { useSelector } from "react-redux";
import { useLocation, useRoutes } from "react-router-dom";
import AppLoader from "./components/HOC/AppLoader";
import routes from "./components/ui/routes";
import PageLayout from "./layouts/PageLayout";
import { getLoggedInStatusSelector } from "./store/Users/selectors";

function App() {
  const isLoggedIn = useSelector(getLoggedInStatusSelector());
  const elements = useRoutes(routes(isLoggedIn));

  return (
    <AppLoader>
      <PageLayout>{elements}</PageLayout>
    </AppLoader>
  );
}

export default App;
