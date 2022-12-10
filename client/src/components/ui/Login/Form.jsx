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
    <div className="flex flex-row justify-center w-full max-w-xs">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {type === "registration" && (
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Имя
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              {...register("name", { required: "Пожалуста, введите имя" })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
            />
            {errors.login ? (
              <ErrorMessage errorText={errors.login.message} />
            ) : null}
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Электронная почта
          </label>
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
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
          />
          {errors.email ? (
            <ErrorMessage errorText={errors.email.message} />
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Пароль
          </label>
          <div className="flex justify-between items-center">
            <input
              type={inputType}
              name="password"
              placeholder="Password"
              {...register("password", {
                required: "Пожалуста, введите пароль",
                pattern: {
                  value: /[A-Z]+/g,
                  message:
                    "Пароль должен содержать хотя бы одну заглавную букву",
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
              className="block py-2.5 px-0 w-3/4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
            />
            <img src={img} className="w-7 h-7" onClick={togglePassword} />
          </div>
          {asyncErrors?.error && (
            <ErrorMessage errorText={asyncErrors?.error?.message} />
          )}
          {errors.password ? (
            <ErrorMessage errorText={errors.password.message} />
          ) : null}
        </div>
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
