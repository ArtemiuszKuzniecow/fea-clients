import PropTypes from "prop-types";
import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../../ui/Loader/Loader";
import MyButton from "../Button/MyButton";

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
    <div>
      <MyButton
        type="text"
        isDisabled={false}
        onClick={() => {
          toggleList();
        }}
      >
        {textSample}
      </MyButton>
      <ul hidden={!openList}>
        {array.map((item) => {
          return (
            <li
              key={item}
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
