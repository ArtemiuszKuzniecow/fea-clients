import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInStatusSelector } from "../../store/Users/selectors";
import { useEffect } from "react";
import { loadUserData } from "../../store/Users/actions";
import localStorageService from "../../assets/services/localStorageService";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getLoggedInStatusSelector());
  const userId = localStorageService.getUserId();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUserData(userId));
    }
  }, [dispatch]);

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
