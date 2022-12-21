// import PropTypes from "prop-types";
// import React from "react";
// import { useSelector } from "react-redux";
// import { Redirect, Route } from "react-router-dom";
// import { getLoggedInStatusSelector } from "../../store/Users/selectors";

// const ProtectedRoute = ({ component: Component, children, ...rest }) => {
//   const isLoggedIn = useSelector(getLoggedInStatusSelector());

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (!isLoggedIn) {
//           return (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: {
//                   from: props.location,
//                 },
//               }}
//             />
//           );
//         }
//         return Component ? <Component {...props} /> : children;
//       }}
//     />
//   );
// };

// ProtectedRoute.propTypes = {
//   component: PropTypes.func,
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]),
// };

// export default ProtectedRoute;
