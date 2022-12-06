import React from "react";
import PropTypes from "prop-types";

const MyButton = ({ text, isDisabled, onClick, type }) => {
  return (
    <button disabled={isDisabled} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

MyButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default MyButton;
