import React, { useState } from "react";
import PropTypes from "prop-types";
import OrderCard from "../../common/OrderCard/OrderCard";
import Loader from "../../ui/Loader/Loader";
import { useEffect } from "react";
import useUserData from "../../../hooks/useUserData";
import { useParams } from "react-router-dom";

const CurrentOrdersPage = () => {
  const { id } = useParams();
  const { orders, isLoading, isOrdersLoading, getCompanyById } = useUserData();
  const company = getCompanyById(id);
  const [currentOrders, setCurrentOrders] = useState(null);

  useEffect(() => {
    setCurrentOrders(orders.filter((o) => o.companyId === company.id));
  }, [isLoading, isOrdersLoading]);

  return currentOrders ? (
    <>
      <h1>Запросы компании {company.company}</h1>
      {currentOrders.map((currentOrder) => {
        return (
          <OrderCard
            order={currentOrder}
            companyName={company.company}
            key={currentOrder.orderId}
          />
        );
      })}
    </>
  ) : (
    <Loader />
  );
};

CurrentOrdersPage.propTyoes = {
  company: PropTypes.object,
};

export default CurrentOrdersPage;
