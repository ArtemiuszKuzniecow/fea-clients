import React from "react";
import PropTypes from "prop-types";

const Headline = ({ children }) => {
  return (
    <h2 className="flex justify-center font-medium leading-tight lg:text-3xl sm:text-2xl mt-0 mb-2 text-sky-700">
      {children}
    </h2>
  );
};

Headline.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Headline;
