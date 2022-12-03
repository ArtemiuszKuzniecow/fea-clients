import React, { useState } from "react";
import style from "./Comment.module.scss";
import PropTypes from "prop-types";

const CommentForm = ({ onClick }) => {
  const [commentData, setCommentData] = useState("");

  const handleChange = ({ target }) => {
    setCommentData(target.value);
  };

  return (
    <div className={style.comment}>
      <div className={style.comment_header}>Комментарий</div>
      <textarea
        className={style.comment_text}
        value={commentData}
        onChange={handleChange}
      ></textarea>
      <div
        className={style.comment_footer}
        onClick={() => {
          commentData.length > 0 && onClick(commentData);
          setCommentData("");
        }}
      >
        Добавить комментарий
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  onClick: PropTypes.func,
};

export default CommentForm;
