import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import getDateFormat from "../../../utils/getDateFormat";
import { deleteOrder } from "../../../store/Orders/actions";
import { deleteOrderComment } from "../../../store/OrdersComments/actions";
import { getAllOrdersCommentsById } from "../../../store/OrdersComments/selectors";
import MyButton from "../Button/MyButton";
import ModalContent from "../ModalContent/ModalContent";
import ModalWindow from "../ModalWindow/ModalWindow";
import style from "./OrderCard.module.scss";

const OrderCard = ({ order, companyName }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orderComments = useSelector(getAllOrdersCommentsById(order.orderId));

  const [isOpen, setIsOpen] = useState(false);
  const handleRedirect = (id) => {
    history.location.pathname = "/";
    history.push(`orders-list/${id}`);
  };
  const handleDeleteOrder = () => {
    dispatch(deleteOrder(order));
    orderComments &&
      orderComments.forEach((c) => dispatch(deleteOrderComment(c)));
    history.push("/orders-list");
  };

  return (
    <>
      <div
        className={
          order.isClosed
            ? style.orders_card_container_closed
            : style.orders_card_container_opened
        }
        key={order.orderId}
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
          <br />
          <MyButton
            text="Удалить запрос из базы"
            onClick={() => setIsOpen((prevState) => !prevState)}
          />
          <ModalWindow
            open={isOpen}
            onClose={() => setIsOpen((prevState) => !prevState)}
          >
            <ModalContent
              deleteFunc={() => handleDeleteOrder()}
              openFunc={() => setIsOpen((prevState) => !prevState)}
              item="запрос"
            />
          </ModalWindow>
        </div>
      </div>
      <br />
    </>
  );
};

OrderCard.propTypes = {
  order: PropTypes.object,
  companyName: PropTypes.string,
};

export default OrderCard;
