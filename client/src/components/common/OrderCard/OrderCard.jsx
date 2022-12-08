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
      <div className="p-5 mt-5 rounded-lg shadow-lg bg-sky-50 ">
        <h3 className="flex justify-center rounded-lg font-medium leading-tight text-3xl mt-0 mb-2 text-sky-600 bg-white ">
          {companyName}
        </h3>
        <div className="flex flex-row md:justify-around flex-wrap">
          <div className="max-md:w-full max-sm:w-full">
            <div className="flex flex-row items-center gap-2">
              <h3>Статус запроса: </h3>
              <span className="bg-yellow-200 px-2 rounded-lg">
                {order.status}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <h3>Вид контракта: </h3>
                <p>{order.contractType}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <h3>Вид перевозки: </h3>
                <p>{order.containersTypes}</p>
              </div>
            </div>
          </div>
          <div className="max-md:w-full max-sm:w-full">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <h3>Инкотермс: </h3>
                <p>{order.incoterms}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <h3>Характер груза: </h3>
                <p>{order.typeOfCargo}</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-2">
              <p>Дата запроса: {getDateFormat(order.date, ".")}</p>
              <p
                className={`bg-${
                  order.isActual ? "green" : "red"
                }-200 px-2 rounded-lg`}
              >
                {order.isActual ? "Актуальный груз" : "Неактуальный груз"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-evenly py-2 flex-wrap">
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
