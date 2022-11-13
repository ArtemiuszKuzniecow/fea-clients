import PropTypes from "prop-types";
import React from "react";
import MyButton from "../../Button/MyButton";
import style from "./TextField.module.scss";

const TextField = ({
  type,
  name,
  hasButton,
  buttonText,
  onChange,
  onClick,
  disabled,
}) => {
  return (
    <div className={style.field_container}>
      <input
        type={type}
        name={name}
        id={name}
        className={
          disabled ? style.field_style_usual_disabled : style.field_style_usual
        }
        onChange={onChange}
        disabled={disabled}
      />
      {hasButton && <MyButton text={buttonText} onClick={onClick} />}
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
