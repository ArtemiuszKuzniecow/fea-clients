import React, { useEffect, useState } from "react";
import MyButton from "../Button/MyButton";
import style from "./DropDownList.module.scss";
import PropTypes from "prop-types";

const DropDownList = ({ array, sampleText }) => {
  const [openList, setOpenList] = useState(false);
  const [textSample, setTextSample] = useState(sampleText);

  const toggleList = () => {
    setOpenList((prevState) => {
      return !prevState;
    });
  };
  const handleSampleText = (text) => {
    setTextSample(text);
    toggleList();
  };

  return (
    <div className={style.dropdown_container}>
      <MyButton
        text={textSample}
        isDisabled={false}
        onClick={() => {
          toggleList();
        }}
      />
      <ul hidden={!openList} className={style.dropdown_container_ul}>
        {array.map((item) => {
          return (
            <li
              key={item}
              className={style.dropdown_container_li}
              onClick={() => {
                handleSampleText(item);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

DropDownList.propTypes = {
  array: PropTypes.array,
  sampleText: PropTypes.string,
};

export default DropDownList;
