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
      <div key={order.orderId}>
        <div>
          <h3>{companyName}</h3>
          <span>{order.status}</span>
        </div>
        <div>
          <p>{order.contractType}</p>
          <p>{order.containersTypes}</p>
        </div>
        <div>
          <p>{order.incoterms}</p>
          <p>{order.typeOfCargo}</p>
        </div>
        <div>
          <p>Дата запроса: {getDateFormat(order.date, ".")}</p>
          <p>{order.isActual ? "Актуальный груз" : "Неактуальный груз"}</p>
          <MyButton onClick={() => handleRedirect(order.orderId)}>
            Открыть запрос
          </MyButton>
          <br />
          <MyButton onClick={() => setIsOpen((prevState) => !prevState)}>
            Удалить запрос из базы
          </MyButton>
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
