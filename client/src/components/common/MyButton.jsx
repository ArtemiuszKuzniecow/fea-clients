import PropTypes from "prop-types";
import React from "react";

const MyButton = ({ children, isDisabled, onClick, type, color, width }) => {
  let currentClass;
  const redButton =
    "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-sky-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800 w-";
  const greenButton =
    "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 w-";
  const blueButton =
    "text-sky-700 hover:text-white border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-sky-500 dark:text-sky-500 dark:hover:text-white dark:hover:bg-sky-600 dark:focus:ring-sky-800 w-";

  if (color === "red") {
    currentClass = redButton;
  } else if (color === "green") {
    currentClass = greenButton;
  } else {
    currentClass = blueButton;
  }
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={currentClass + width}
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
