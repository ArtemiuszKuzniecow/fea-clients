import React from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../../store/Users/actions";
import Headline from "../../common/Headline";
import Form from "./Form";

const Registration = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Headline>Регистрация</Headline>
      <div className="flex flex-row justify-center mt-7">
        <Form
          type="registration"
          submitValue="Зарегистрироваться"
          submitFunction={(data) => dispatch(signUp(data))}
        />
      </div>
    </>
  );
};

export default Registration;
