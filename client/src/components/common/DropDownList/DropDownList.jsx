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
      <ul
        hidden={!openList}
        className="py-1 text-sm text-sky-700 dark:text-sky-200 "
        aria-labelledby="dropdownDefault"
      >
        {array.map((item) => {
          return (
            <li
              key={item}
              onClick={() => {
                handleSampleText(item);
              }}
              className="block py-2 px-4 hover:bg-sky-100 dark:hover:bg-sky-600 dark:hover:text-white cursor-pointer"
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
