import React, { useState } from "react";
import PropTypes from "prop-types";

const CommentForm = ({ onClick }) => {
  const [commentData, setCommentData] = useState("");

  const handleChange = ({ target }) => {
    setCommentData(target.value);
  };

  return (
    <div>
      <div>Комментарий</div>
      <textarea value={commentData} onChange={handleChange}></textarea>
      <div
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
