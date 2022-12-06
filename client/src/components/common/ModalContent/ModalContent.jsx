import React from "react";
import MyButton from "../Button/MyButton";
import PropTypes from "prop-types";

const ModalContent = ({ deleteFunc, openFunc, item }) => {
  return (
    <>
      <div>
        Вы уверены, что хотите удалить {item} из базы?
        <div>
          <MyButton text="Да" onClick={deleteFunc} />
          <MyButton text="Нет" onClick={openFunc} />
        </div>
      </div>
    </>
  );
};

ModalContent.propTypes = {
  deleteFunc: PropTypes.func,
  openFunc: PropTypes.func,
  item: PropTypes.string,
};

export default ModalContent;
