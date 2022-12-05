import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../../store/Users/actions";
import Form from "./Form";

const Login = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h2>Вход в систему</h2>
      <Form
        type="login"
        submitValue="Войти"
        submitFunction={(data) => dispatch(logIn(data))}
      />
    </>
  );
};

export default Login;
