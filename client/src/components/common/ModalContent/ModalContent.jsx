import React from "react";
import MyButton from "../Button/MyButton";
import PropTypes from "prop-types";

const ModalContent = ({ deleteFunc, openFunc, item }) => {
  return (
    <>
      <div>
        Вы уверены, что хотите удалить {item} из базы?
        <div>
          <MyButton onClick={deleteFunc}>Да</MyButton>
          <MyButton onClick={openFunc}>Нет</MyButton>
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
