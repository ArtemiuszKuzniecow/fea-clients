import React from "react";
import style from "./MyButton.module.scss";
import PropTypes from "prop-types";

const MyButton = ({ text, isDisabled, onClick, onSubmit, type }) => {
  return (
    <button
      className={style.myButton}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      onSubmit={onSubmit}
    >
      {text}
    </button>
  );
};

MyButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default MyButton;
