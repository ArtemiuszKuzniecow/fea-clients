import PropTypes from "prop-types";
import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../../ui/Loader/Loader";
import MyButton from "../Button/MyButton";
import style from "./DropDownList.module.scss";

const DropDownList = ({ array, sampleText, onChange, name }) => {
  const [openList, setOpenList] = useState(false);
  const [textSample, setTextSample] = useState(sampleText);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (array) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [array]);

  const toggleList = () => {
    setOpenList((prevState) => {
      return !prevState;
    });
  };
  const handleSampleText = (text) => {
    setTextSample(text);
    onChange({ [name]: text });
    toggleList();
  };

  return !isLoading ? (
    <div className={style.dropdown_container}>
      <MyButton
        text={textSample}
        type="text"
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
  ) : (
    <Loader />
  );
};

DropDownList.propTypes = {
  array: PropTypes.array,
  sampleText: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default DropDownList;
