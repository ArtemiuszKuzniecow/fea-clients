import React from "react";
import style from "./Loader.module.scss";

const Loader = () => {
  return (
    <ul className={style.loader}>
      <li className={style.loader_item}></li>
      <li className={style.loader_item}></li>
      <li className={style.loader_item}></li>
      <li className={style.loader_item}></li>
      <li className={style.loader_item}></li>
    </ul>
  );
};

export default Loader;
