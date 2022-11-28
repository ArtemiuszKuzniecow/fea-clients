import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";
import OrderLayout from "../../../layouts/OrderLayout/OrderLayout";
import MyButton from "../../common/Button/MyButton";
import OrderCard from "../../common/OrderCard/OrderCard";
import Loader from "../../ui/Loader/Loader";

const OrdersListPage = () => {
  const {
    isLoading,
    isLeadsLoading,
    isOrdersLoading,
    orders,
    companies,
    openedStatus,
    orderDate,
  } = useUserData();
  const [currentOrders, setCurrentOrders] = useState([]);
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
    if (
      !isLoading &&
      !isLeadsLoading &&
      !isOrdersLoading &&
      orders &&
      orders.length
    ) {
      if (openedStatus === "" && orderDate === "") {
        setCurrentOrders(orders);
      } else if (openedStatus && orderDate === "") {
        setCurrentOrders(orders.filter((o) => o.isClosed));
      } else if (!openedStatus && orderDate === "") {
        setCurrentOrders(orders.filter((o) => !o.isClosed));
      } else if (openedStatus === "" && typeof orderDate === "number") {
        setCurrentOrders(orders.filter((o) => o.date === orderDate));
      } else if (openedStatus && typeof orderDate === "number") {
        setCurrentOrders(
          orders.filter((o) => o.date === orderDate && o.isClosed)
        );
      } else if (!openedStatus && typeof orderDate === "number") {
        setCurrentOrders(
          orders.filter((o) => o.date === orderDate && !o.isClosed)
        );
      }
    }
  }, [isLoading, isLeadsLoading, isOrdersLoading, openedStatus, orderDate]);

  useEffect(() => {
    if (currentOrders && companies) {
      setOrdersArray(createOrdersArray(currentOrders, companies));
    }
  }, [currentOrders]);

  return (
    <OrderLayout>
      {!isLoading && !isLeadsLoading && !isOrdersLoading && currentOrders ? (
        orders.length > 0 ? (
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
