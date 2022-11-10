import React from "react";
import style from "./OrderCard.module.scss";
import MyButton from "../Button/MyButton";
import getDateFormat from "../../../assets/utils/getDateFormat";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const OrderCard = ({ order, companyName }) => {
  const history = useHistory();
  const handleRedirect = (id) => {
    history.push(`orders-list/${id}`);
  };
  return (
    <div
      className={
        order.isClosed
          ? style.orders_card_container_closed
          : style.orders_card_container_opened
      }
      key={order.id}
    >
      <div className={style.orders_card_container_item}>
        <h3>{companyName}</h3>
        <span>{order.status}</span>
      </div>
      <div className={style.orders_card_container_item}>
        <p>{order.contractType}</p>
        <p>{order.containersTypes}</p>
      </div>
      <div className={style.orders_card_container_item}>
        <p>{order.incoterms}</p>
        <p>{order.typeOfCargo}</p>
      </div>
      <div className={style.orders_card_container_item}>
        <p>Дата запроса: {getDateFormat(order.date, ".")}</p>
        <p>{order.isActual ? "Актуальный груз" : "Неактуальный груз"}</p>
        <MyButton
          text="Открыть запрос"
          onClick={() => handleRedirect(order.orderId)}
        />
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.object,
  companyName: PropTypes.string,
};

export default OrderCard;
