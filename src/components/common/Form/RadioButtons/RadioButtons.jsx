import React from "react";
import PropTypes from "prop-types";

const RadioButtons = ({ name, onChange, isPositive }) => {
  return <input type="radio" name={name} id={name} />;
};

RadioButtons.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  isPositive: PropTypes.bool,
};

export default RadioButtons;
