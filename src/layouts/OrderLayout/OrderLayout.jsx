import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import DropDownList from "../../components/common/DropDownList/DropDownList";
import { getUserOrdersSelector } from "../../store/Users/selectors";
import style from "./OrderLayout.module.scss";

const OrderLayout = ({ children }) => {
  const orders = useSelector(getUserOrdersSelector());
  const dates = orders
    ? orders.map((order) => Object.values(order)[0].date)
    : ["Добавьте первый запрос"];

  return (
    <>
      <h1>Запросы</h1>
      <div className={style.order_layout_container}>
        <div className={style.order_layout_container_item}>
          <DropDownList
            sampleText="Сортировать (открытые/закрытые запросы)"
            array={["Открытые", "Закрытые"]}
          />
        </div>

        <div className={style.order_layout_container_item}>
          <DropDownList
            sampleText="Сортировать по дате запроса"
            array={dates}
          />
        </div>
      </div>
      {children}
    </>
  );
};

OrderLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default OrderLayout;
