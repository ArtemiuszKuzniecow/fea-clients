import React, { useState } from "react";
import PropTypes from "prop-types";

const CommentForm = ({ onClick }) => {
  const [commentData, setCommentData] = useState("");

  const handleChange = ({ target }) => {
    setCommentData(target.value);
  };

  return (
    <div className="w-full mb-4 border border-sky-200 rounded-lg bg-sky-50">
      <div className="px-4 py-2 bg-white rounded-t-lg">
        <label htmlFor="comment" className="sr-only">
          Комментарий
        </label>
        <textarea
          value={commentData}
          onChange={handleChange}
          id="comment"
          rows="4"
          className="w-full px-0 text-sm  bg-white border-0"
          placeholder="Напишите комментарий..."
          required
        ></textarea>
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t">
        <div
          onClick={() => {
            commentData.length > 0 && onClick(commentData);
            setCommentData("");
          }}
          className="flex-1 px-6 py-1 font-semibold select-none rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200 cursor-pointer"
        >
          Добавить комментарий
        </div>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  onClick: PropTypes.func,
};

export default CommentForm;
