import React from "react";
import style from "./ModalWindow.module.scss";
import PropTypes from "prop-types";

const ModalWindow = ({ open, children, onClose }) => {
  if (!open) return null;
  return (
    <>
      <div className={style.modal} onClick={onClose} />
      <div className={style.content}>
        <button onClick={onClose} className={style.button}>
          &#10060;
        </button>
        {children}
      </div>
    </>
  );
};

ModalWindow.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ModalWindow;
