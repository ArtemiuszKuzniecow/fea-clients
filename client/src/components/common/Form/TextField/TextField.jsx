import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import MyButton from "../../Button/MyButton";
const TextField = ({
  type,
  name,
  hasButton,
  buttonText,
  onChange,
  onClick,
  disabled,
  value,
}) => {
  const [content, setContent] = useState(value || "");
  function handleChange({ target }) {
    onChange(target);
    setContent(target.value);
  }
  return (
    <div>
      <input
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        disabled={disabled}
        value={content}
      />
      {hasButton && <MyButton onClick={onClick}>{buttonText}</MyButton>}
    </div>
  );
};

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  hasButton: PropTypes.bool,
  buttonText: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TextField;
