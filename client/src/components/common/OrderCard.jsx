import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteOrder } from "../../store/Orders/actions";
import { deleteOrderComment } from "../../store/OrdersComments/actions";
import { getAllOrdersCommentsById } from "../../store/OrdersComments/selectors";
import getDateFormat from "../../utils/getDateFormat";
import ModalContent from "./ModalContent";
import ModalWindow from "./ModalWindow/ModalWindow";
import MyButton from "./MyButton";

const OrderCard = ({ order, companyName, companyId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderComments = useSelector(getAllOrdersCommentsById(order._id));

  const [isOpen, setIsOpen] = useState(false);
  const handleRedirect = (id) => {
    navigate(`../../orders-list/${id}`, { replace: true });
  };
  const handleDeleteOrder = () => {
    dispatch(deleteOrder(order));
    orderComments &&
      orderComments.forEach((c) => dispatch(deleteOrderComment(c)));
    navigate("/orders-list");
  };

  return (
    <>
      <tr className="bg-white border-b">
        <th
          scope="row"
          className={`py-4 px-6 font-medium text-gray-900 whitespace-nowrap hover:text-blue-700 ${
            order.isClosed ? "bg-red-200" : ""
          }`}
        >
          <Link to={`/${companyId}`}>{companyName}</Link>
        </th>
        <td
          className={`py-3 px-6 max-sm:hidden ${
            order.isClosed ? "bg-red-200" : ""
          }`}
        >
          {order.isClosed ? "Запрос закрыт" : order.status}
        </td>
        <td
          className={`py-3 px-6 max-md:hidden ${
            order.isActual ? "bg-green-300" : "bg-red-300"
          }`}
        >
          {order.isActual ? "Актуальный груз" : "Неактуальный груз"}
        </td>
        <td className="py-3 px-6 max-sm:hidden">
          {getDateFormat(order.date, ".")}
        </td>
        <td className="py-3 px-6 max-md:hidden">{order.containersTypes}</td>
        <td className="py-3 px-6 max-xl:hidden">{order.incoterms}</td>
        <td className="py-3 px-6 max-xl:hidden">{order.typeOfCargo}</td>
        <td className="py-3 px-6 max-xl:hidden">{order.contractType}</td>
        <td className="p-1">
          <MyButton onClick={() => handleRedirect(order._id)}>
            Подробнее
          </MyButton>
        </td>
        <td className="p-1 max-lg:hidden">
          <MyButton onClick={() => setIsOpen((prevState) => !prevState)}>
            Удалить
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
        </td>
      </tr>
    </>
  );
};

OrderCard.propTypes = {
  order: PropTypes.object,
  companyName: PropTypes.string,
};

export default OrderCard;
