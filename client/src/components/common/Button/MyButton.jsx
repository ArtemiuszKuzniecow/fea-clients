import React from "react";
import PropTypes from "prop-types";

const MyButton = ({ children, isDisabled, onClick, type }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className="text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-500 dark:hover:bg-sky-400 focus:outline-none dark:focus:ring-sky-500"
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
};

export default MyButton;
