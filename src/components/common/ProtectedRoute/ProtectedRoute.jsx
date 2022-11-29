import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import localStorageService from "../../../services/localStorageService";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const accessToken = localStorageService.getAccessToken();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!accessToken) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ProtectedRoute;
