import React from "react";
import style from "./MyButton.module.scss";
import PropTypes from "prop-types";

const MyButton = ({ text, isDisabled, onClick }) => {
  return (
    <button className={style.myButton} disabled={isDisabled} onClick={onClick}>
      {text}
    </button>
  );
};

MyButton.propTypes = {
  text: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default MyButton;
