import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import getDateFormat from "../../../utils/getDateFormat";
import style from "./Comment.module.scss";

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
      <div className={style.comment}>
        <div className={style.comment_header}>Комментарий</div>
        <div className={style.comment_header}>{getDateFormat(date, ".")}</div>
        <div className={style.comment_text}>{text}</div>
      </div>
      <div className={style.comment_footer} onClick={onDelete}>
        Удалить комментарий
      </div>

      {!onlyComment && lastComment && (
        <div className={style.comment_footer} onClick={onCollapse}>
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
