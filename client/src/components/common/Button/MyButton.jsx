import React from "react";
import PropTypes from "prop-types";

const MyButton = ({ children, isDisabled, onClick, type, color, width }) => {
  const currentColor = color ? color : "sky";
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={
        "text-" +
        currentColor +
        "-700 hover:text-white border border-" +
        currentColor +
        "-700 hover:bg-" +
        currentColor +
        "-800 focus:ring-4 focus:outline-none focus:ring-" +
        currentColor +
        "-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-" +
        currentColor +
        "-500 dark:text-" +
        currentColor +
        "-500 dark:hover:text-white dark:hover:bg-" +
        currentColor +
        "-600 dark:focus:ring-" +
        currentColor +
        "-800 w-" +
        width
      }
    >
      {children}
    </button>
  );
};

MyButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  width: PropTypes.string,
};

export default MyButton;
