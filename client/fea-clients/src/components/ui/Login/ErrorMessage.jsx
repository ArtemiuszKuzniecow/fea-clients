import React from "react";
import style from "./Login.module.scss";
import PropTypes from "prop-types";

const ErrorMessage = ({ errorText }) => {
  return (
    <span className={style.form_container_error} key="error_log">
      {errorText}
    </span>
  );
};

ErrorMessage.propTypes = {
  errorText: PropTypes.string,
};

export default ErrorMessage;
