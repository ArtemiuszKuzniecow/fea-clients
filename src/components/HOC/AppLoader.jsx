import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import localStorageService from "../../assets/services/localStorageService";
import { loadLeadsData } from "../../store/Leads/actions";
import { loadLeadsCommentsData } from "../../store/LeadsComments/actions";
import { loadOrdersData } from "../../store/Orders/actions";
import { loadUserData } from "../../store/Users/actions";
import { getLoggedInStatusSelector } from "../../store/Users/selectors";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getLoggedInStatusSelector());
  const userId = localStorageService.getUserId();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUserData(userId));
      dispatch(loadLeadsData());
      dispatch(loadOrdersData());
      dispatch(loadLeadsCommentsData());
    }
  }, [isLoggedIn]);

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
