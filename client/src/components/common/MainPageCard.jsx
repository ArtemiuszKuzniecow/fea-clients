import React from "react";

const MainPageCard = ({ children, header, isCompaniesCollapsed }) => {
  return (
    <div
      className={`block md:p-6 max-md:p-2 rounded-lg shadow-lg bg-white max-w-sm flex flex-col justify-center mb-4 w-96${
        !isCompaniesCollapsed ? "min-h-44" : "h-44"
      }`}
    >
      <h4 className="text-gray-900 md:text-xl max-md:text-md leading-tight font-medium mb-2">
        {header}
      </h4>
      {children}
    </div>
  );
};

export default MainPageCard;
