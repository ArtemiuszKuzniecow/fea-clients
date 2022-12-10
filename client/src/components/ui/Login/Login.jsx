import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../../store/Users/actions";
import Headline from "../../common/Headline";
import Form from "./Form";

const Login = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Headline>Вход в систему</Headline>
      <div className="flex flex-row justify-center mt-7">
        <Form
          type="login"
          submitValue="Войти"
          submitFunction={(data) => dispatch(logIn(data))}
        />
      </div>
    </>
  );
};

export default Login;
