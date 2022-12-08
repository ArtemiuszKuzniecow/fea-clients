import PropTypes from "prop-types";
import React, { useState } from "react";
import { useEffect } from "react";
import { ArrowDownImg, ArrowUpImg } from "../../../assets/styles/svg";
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
    <div className="w-11/12">
      <MyButton
        type="text"
        isDisabled={false}
        onClick={() => {
          toggleList();
        }}
        width={"full"}
      >
        <div className="flex gap-3 justify-center">
          {textSample} {openList ? <ArrowUpImg /> : <ArrowDownImg />}
        </div>
      </MyButton>
      <ul
        hidden={!openList}
        className="text-sm text-sky-700 dark:text-sky-200 "
      >
        <div className="border-solid border-2 border-sky-200 rounded-lg">
          {array.map((item) => {
            return (
              <li
                key={item}
                onClick={() => {
                  handleSampleText(item);
                }}
                className="block py-2 px-4 hover:bg-sky-200 dark:hover:bg-sky-600 dark:hover:text-white cursor-pointer"
              >
                {item}
              </li>
            );
          })}
        </div>
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
