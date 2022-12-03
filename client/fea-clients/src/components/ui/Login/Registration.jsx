import React from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../../store/Users/actions";
import Form from "./Form";

const Registration = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h2>Регистрация</h2>
      <Form
        type="registration"
        submitValue="Зарегистрироваться"
        submitFunction={(data) => dispatch(signUp(data))}
      />
    </>
  );
};

export default Registration;
