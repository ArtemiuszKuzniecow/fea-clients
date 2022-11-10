import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderLayout from "../../../layouts/OrderLayout/OrderLayout";
import {
  getUserLeadsSelector,
  getUserOrdersSelector,
} from "../../../store/Users/selectors";
import MyButton from "../../common/Button/MyButton";
import OrderCard from "../../common/OrderCard/OrderCard";

const OrdersListPage = () => {
  const orders = useSelector(getUserOrdersSelector());
  const companies = useSelector(getUserLeadsSelector());
  const ordersArray = [];
  if (companies && orders) {
    for (const company of companies) {
      orders.forEach((order) => {
        if (Object.values(order)[0].companyId === company.id) {
          ordersArray.push({
            direction: company.directions,
            incoterms: Object.values(order)[0].incoterms,
            containersTypes: Object.values(order)[0].containersTypes,
            contractType: Object.values(order)[0].contractType,
            typeOfCargo: Object.values(order)[0].typeOfCargo,
            company: company.company,
            date: Object.values(order)[0].date,
            orderId: Object.values(order)[0].orderId,
            status: Object.values(order)[0].status,
            isActual: Object.values(order)[0].isActual,
            isClosed: Object.values(order)[0].isClosed,
          });
        }
      });
    }
  }

  return (
    <OrderLayout>
      {orders ? (
        ordersArray &&
        ordersArray.map((order) => {
          return (
            <OrderCard
              order={order}
              companyName={order.company}
              key={order.orderId}
            />
          );
        })
      ) : (
        <>
          <h3>Добавтье первую компанию</h3>
          <Link to="/new-order">
            <MyButton text="Добавить запрос" />
          </Link>
        </>
      )}
    </OrderLayout>
  );
};

export default OrdersListPage;
