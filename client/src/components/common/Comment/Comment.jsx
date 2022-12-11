import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import getDateFormat from "../../../utils/getDateFormat";

const Comment = ({
  date,
  text,
  collapse,
  onCollapse,
  lastComment,
  onlyComment,
  onDelete,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    setIsCollapsed(collapse);
  }, [collapse]);

  return (
    <div className="w-full mb-4 border border-sky-200 rounded-lg bg-sky-50 dark:bg-sky-700 dark:border-sky-600 px-3 py-2 ">
      <div>
        <div className="space-y-1 font-medium dark:text-white">Комментарий</div>
        <div>{getDateFormat(date, ".")}</div>
        <div className="flex p-4 bg-white rounded-lg dark:bg-gray-700">
          {text}
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
        <div
          onClick={onDelete}
          className="flex-1 px-6 py-1 font-semibold select-none rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200 cursor-pointer"
        >
          Удалить комментарий
        </div>
      </div>
      {!onlyComment && lastComment && (
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <div
            onClick={onCollapse}
            className="flex-1 px-6 py-1 font-semibold select-none rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200 cursor-pointer"
          >
            {isCollapsed
              ? "Скрыть все комментарии"
              : "Показать все комментарии"}
          </div>
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  date: PropTypes.string,
  text: PropTypes.string,
  collapse: PropTypes.bool,
  onCollapse: PropTypes.func,
  lastComment: PropTypes.bool,
  onlyComment: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default Comment;
