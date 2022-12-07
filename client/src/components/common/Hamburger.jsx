import React from "react";
import PropTypes from "prop-types";

const Hamburger = ({ func }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center p-2 ml-3 text-sm text-sky-500 rounded-lg md:hidden hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:text-sky-400 dark:hover:bg-sky-700 dark:focus:ring-sky-600"
      onClick={func}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

Hamburger.propTypes = {
  func: PropTypes.func,
};
export default Hamburger;
