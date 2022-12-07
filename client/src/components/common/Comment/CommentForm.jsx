import React, { useState } from "react";
import PropTypes from "prop-types";

const CommentForm = ({ onClick }) => {
  const [commentData, setCommentData] = useState("");

  const handleChange = ({ target }) => {
    setCommentData(target.value);
  };

  return (
    <div className="w-full mb-4 border border-sky-200 rounded-lg bg-sky-50 dark:bg-sky-700 dark:border-sky-600">
      <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-sky-800">
        <label for="comment" class="sr-only">
          Комментарий
        </label>
        <textarea
          value={commentData}
          onChange={handleChange}
          id="comment"
          rows="4"
          class="w-full px-0 text-sm  bg-white border-0 dark:bg-sky-800 focus:ring-0 dark:text-white dark:placeholder-sky-400"
          placeholder="Напишите комментарий..."
          required
        ></textarea>
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600s">
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
