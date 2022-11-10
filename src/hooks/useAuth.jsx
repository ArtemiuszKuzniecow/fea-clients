// import axios from "axios";
// import PropTypes from "prop-types";
// import React, { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import localStorageService, {
//   setTokens,
// } from "../assets/services/localStorageService";
// import userService from "../store/Users/userService";
// import { httpAuth } from "../assets/services/authService";

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// const AuthProvider = ({ children }) => {
//   const [currentUser, setUser] = useState();
//   const [error, setError] = useState(null);
//   const [isLoading, setLoading] = useState(true);
//   const history = useHistory();

//   async function signUp({ email, password, ...rest }) {
//     try {
//       const { data } = await httpAuth.post("accounts:signUp", {
//         email,
//         password,
//         returnSecureToken: true,
//       });
//       setTokens(data);
//       await createUser({ id: data.localId, ...rest });
//     } catch (error) {
//       const { code, message } = error.response.data.error;
//       if (code === 400) {
//         if (message === "EMAIL_EXISTS") {
//           const errorObj = {
//             email: {
//               message: "Пользователь с таким E-mail уже существует",
//             },
//           };
//           throw errorObj;
//         }
//       }
//     }
//   }

//   async function createUser(data) {
//     try {
//       const { content } = await userService.create(data);
//       setUser(content);
//     } catch (error) {
//       errorCatcher(error);
//     }
//   }

//   async function signIn({ email, password }) {
//     try {
//       const { data } = await httpAuth.post("accounts:signInWithPassword", {
//         email,
//         password,
//         returnSecureToken: true,
//       });
//       setTokens(data);
//       await getUserData(data.localId);
//     } catch (error) {
//       errorCatcher(error);
//       const { code, message } = error.response.data.error;
//       if (code === 400) {
//         const invalidEmail = {
//           email: { message: "Неверная электронная почта или пароль" },
//         };
//         const invalidPassword = {
//           password: { message: "Неверный электронная почта или пароль" },
//         };
//         const blockedUser = {
//           email: { message: "Даннный пользователь заблокирован." },
//           password: { message: "Даннный пользователь заблокирован." },
//         };
//         if (message === "EMAIL_NOT_FOUND") {
//           throw invalidEmail;
//         } else if (message === "INVALID_PASSWORD") {
//           throw invalidPassword;
//         } else if (message === "USER_DISABLED") {
//           throw blockedUser;
//         }
//       }
//     }
//   }

//   async function getUserData(id) {
//     try {
//       const { content } = await userService.get(id);
//       setUser(content);
//     } catch (error) {
//       errorCatcher(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function errorCatcher(error) {
//     const { message } = error.response.data;
//     console.log(error);
//     setError(error);
//   }

//   function logOut() {
//     localStorageService.removeAuthData();
//     setUser(null);
//     history.push("/");
//   }

//   useEffect(() => {
//     if (
//       localStorageService.getAccessToken() &&
//       localStorageService.getUserId()
//     ) {
//       const currentId = localStorageService.getUserId();
//       getUserData(currentId);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (error !== null) {
//       alert(error);
//       setError(null);
//     }
//   }, [error]);
//   return (
//     <AuthContext.Provider value={{ signUp, signIn, logOut, currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]),
// };

// export default AuthProvider;
