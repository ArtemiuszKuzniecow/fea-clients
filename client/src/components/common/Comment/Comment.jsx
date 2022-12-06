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
    <>
      <div>
        <div>Комментарий</div>
        <div>{getDateFormat(date, ".")}</div>
        <div>{text}</div>
      </div>
      <div onClick={onDelete}>Удалить комментарий</div>

      {!onlyComment && lastComment && (
        <div onClick={onCollapse}>
          {isCollapsed ? "Скрыть все комментарии" : "Показать все комментарии"}
        </div>
      )}
    </>
  );
};

Comment.propTypes = {
  date: PropTypes.number,
  text: PropTypes.string,
  collapse: PropTypes.bool,
  onCollapse: PropTypes.func,
  lastComment: PropTypes.bool,
  onlyComment: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default Comment;
