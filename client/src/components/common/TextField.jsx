import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import MyButton from "./MyButton";
const TextField = ({
  type,
  name,
  hasButton,
  buttonText,
  onChange,
  onClick,
  disabled,
  value,
  label,
}) => {
  const [content, setContent] = useState(value || "");
  function handleChange({ target }) {
    onChange(target);
    setContent(target.value);
  }
  return (
    <div className="relative z-0 mb-6 w-full group">
      <input
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        disabled={disabled}
        value={content}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer"
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-xl text-gray-500 duration-100 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
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
  label: PropTypes.string,
};

export default TextField;
