import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const RadioButtons = ({ onChange, name }) => {
  const [topping, setTopping] = useState("no");
  const changeTopping = (data) => {
    setTopping(data);
  };
  return (
    <>
      <div>
        <input
          type="radio"
          id="yes"
          value="yes"
          checked={topping === "yes"}
          onClick={() => changeTopping("yes")}
          name={name}
          onChange={onChange}
        />
        <label htmlFor="yes">Да</label>
        {"   "}
        <input
          type="radio"
          id="no"
          value="no"
          checked={topping === "no"}
          onClick={() => changeTopping("no")}
          name={name}
          onChange={onChange}
        />
        <label htmlFor="no">Нет</label>
      </div>
    </>
  );
};

RadioButtons.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  isPositive: PropTypes.bool,
};

export default RadioButtons;
