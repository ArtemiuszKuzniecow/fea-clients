import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MyButton from "../../common/MyButton";
import closedEye from "../../../assets/icons/free-icon-eye-2311537.png";
import openedEye from "../../../assets/icons/free-icon-visible-eye-57122.png";
import PropTypes from "prop-types";
import ErrorMessage from "./ErrorMessage";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getErrorsSelector,
  getLoggedInStatusSelector,
} from "../../../store/Users/selectors";
import { useEffect } from "react";

const Form = ({ type, submitValue, submitFunction }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [img, setImage] = useState(openedEye);
  const [inputType, setInputType] = useState("password");
  const [asyncErrors, setAsyncErrors] = useState({});
  const stateErrors = useSelector(getErrorsSelector());
  const isLoggedIn = useSelector(getLoggedInStatusSelector());
  const history = useHistory();
  const togglePassword = () => {
    setInputType((prevState) =>
      prevState.includes("password") ? "text" : "password"
    );
    setImage((prevState) => (prevState === closedEye ? openedEye : closedEye));
  };

  useEffect(() => {
    if (stateErrors) {
      setAsyncErrors(stateErrors);
    }
  }, [stateErrors]);

  const onSubmit = (data) => {
    submitFunction(data);
    if (isLoggedIn) {
      history.push(
        history.location?.state?.from?.pathname &&
          history.location?.state?.from?.pathname !== "/login"
          ? history.location.state.from.pathname
          : "/"
      );
    }
    reset();
  };

  if (isLoggedIn) return <Redirect to="/" />;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === "registration" && (
          <>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              {...register("name", { required: "Пожалуста, введите имя" })}
            />
            {errors.login ? (
              <ErrorMessage errorText={errors.login.message} />
            ) : null}
          </>
        )}

        <label htmlFor="email">Электронная почта</label>
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          {...register("email", {
            required: "Пожалуста, введите E-mail",
            pattern: {
              value: /^\S+@\S+\.\S+$/g,
              message: "Введите правильный E-mail",
            },
          })}
        />
        {errors.email ? (
          <ErrorMessage errorText={errors.email.message} />
        ) : null}

        <label htmlFor="password">Пароль</label>
        <div>
          <input
            type={inputType}
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "Пожалуста, введите пароль",
              pattern: {
                value: /[A-Z]+/g,
                message: "Пароль должен содержать хотя бы одну заглавную букву",
              },
              pattern: {
                value: /\d+/g,
                message: "Пароль должен содержать хотя бы одно число",
              },
              pattern: {
                value: /[A-Za-z]/,
                message: "Данные должны быть написаны латиницей",
              },
              minLength: {
                value: 8,
                message: "Пароль должен содержать минимум восемь символов",
              },
            })}
          />
          <img src={img} width={20} onClick={togglePassword} />
        </div>
        {asyncErrors?.error && (
          <ErrorMessage errorText={asyncErrors?.error?.message} />
        )}
        {errors.password ? (
          <ErrorMessage errorText={errors.password.message} />
        ) : null}

        <div>
          <br /> <MyButton>{submitValue}</MyButton>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  type: PropTypes.string,
  submitValue: PropTypes.string,
  submitFunction: PropTypes.func,
};

export default Form;
