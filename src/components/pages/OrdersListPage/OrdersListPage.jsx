import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderLayout from "../../../layouts/OrderLayout/OrderLayout";
import {
  getAllLeadsSelector,
  getLeadsLoadingStatus,
} from "../../../store/Leads/selectors";
import {
  getAllOrders,
  getOrdersLoadingStatus,
} from "../../../store/Orders/selectors";
import {
  getIsLoadingStatus,
  getUserDataSelector,
} from "../../../store/Users/selectors";
import MyButton from "../../common/Button/MyButton";
import OrderCard from "../../common/OrderCard/OrderCard";
import Loader from "../../ui/Loader/Loader";

const OrdersListPage = () => {
  const isLoading = useSelector(getIsLoadingStatus());
  const isLeadsLoading = useSelector(getLeadsLoadingStatus());
  const isOrdersLoading = useSelector(getOrdersLoadingStatus());
  const state = useSelector(getUserDataSelector());
  const orders = useSelector(getAllOrders(state?.userData?.orders));
  const companies = useSelector(getAllLeadsSelector(state?.userData?.leads));
  const [ordersArray, setOrdersArray] = useState(null);

  const createOrdersArray = (orders, companies) => {
    let array = [];
    for (const company of companies) {
      orders.forEach((order) => {
        if (order.companyId === company.id) {
          array.push({
            direction: company.directions,
            incoterms: order.incoterms,
            containersTypes: order.containersTypes,
            contractType: order.contractType,
            typeOfCargo: order.typeOfCargo,
            company: company.company,
            date: order.date,
            orderId: order.orderId,
            status: order.status,
            isActual: order.isActual,
            isClosed: order.isClosed,
          });
        }
      });
    }
    return array;
  };

  useEffect(() => {
    if (orders && companies) {
      setOrdersArray(createOrdersArray(orders, companies));
    }
  }, [isLoading, isLeadsLoading, isOrdersLoading]);

  return (
    <OrderLayout>
      {!isLoading && !isLeadsLoading && !isOrdersLoading ? (
        orders ? (
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
        )
      ) : (
        <Loader />
      )}
    </OrderLayout>
  );
};

export default OrdersListPage;
