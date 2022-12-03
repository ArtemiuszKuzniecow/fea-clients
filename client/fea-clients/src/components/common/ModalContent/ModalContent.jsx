import React from "react";
import style from "./ModalContent.module.scss";
import MyButton from "../Button/MyButton";
import PropTypes from "prop-types";

const ModalContent = ({ deleteFunc, openFunc, item }) => {
  return (
    <>
      <div className={style.modal_content}>
        Вы уверены, что хотите удалить {item} из базы?
        <div className={style.modal_content_buttons}>
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
