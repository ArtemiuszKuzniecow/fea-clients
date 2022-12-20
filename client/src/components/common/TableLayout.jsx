import React from "react";
import PropTypes from "prop-types";

const TableLayout = ({ children }) => {
  return (
    <div className="container">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-5">
        <table className="w-full text-sm text-left text-gray-500">
          {children}
        </table>
      </div>
    </div>
  );
};

TableLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default TableLayout;
