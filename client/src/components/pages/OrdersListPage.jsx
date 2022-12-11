import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SortingArrowsImg } from "../../assets/styles/svg";
import useUserData from "../../hooks/useUserData";
import OrderLayout from "../../layouts/OrderLayout";
import MyButton from "../common/MyButton";
import OrderCard from "../common/OrderCard";
import TableLayout from "../common/TableLayout";
import Loader from "../ui/Loader/Loader";

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
        if (order.companyId === company._id) {
          array.push({
            direction: company.directions,
            incoterms: order.incoterms,
            containersTypes: order.containersTypes,
            contractType: order.contractType,
            typeOfCargo: order.typeOfCargo,
            company: company.company,
            date: order.date,
            _id: order._id,
            status: order.status,
            isActual: order.isActual,
            isClosed: order.isClosed,
            companyId: order.companyId,
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
          ordersArray && (
            <TableLayout>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Компания
                  </th>
                  <th scope="col" className="py-3 px-6 max-sm:hidden">
                    <div className="flex items-center">
                      Статус запроса <SortingArrowsImg />
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6 max-md:hidden">
                    <div className="flex items-center">
                      Статус груза <SortingArrowsImg />
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6 max-sm:hidden">
                    <div className="flex items-center">
                      Дата запроса <SortingArrowsImg />
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6 max-md:hidden">
                    <div className="flex items-center">
                      Вид перевозки <SortingArrowsImg />
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6 max-xl:hidden">
                    <div className="flex items-center">
                      Инкотермс <SortingArrowsImg />
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6 max-xl:hidden">
                    <div className="flex items-center">
                      Характер груза <SortingArrowsImg />
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6 max-xl:hidden">
                    <div className="flex items-center">
                      Вид контракта <SortingArrowsImg />
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6 lg:hidden"></th>
                  <th scope="col" className="py-3 px-6 max-lg:hidden"></th>
                  <th scope="col" className="py-3 px-6 max-lg:hidden"></th>
                </tr>
              </thead>
              <tbody>
                {ordersArray.map((order) => {
                  return (
                    <OrderCard
                      order={order}
                      companyName={order.company}
                      key={order._id}
                      companyId={order.companyId}
                    />
                  );
                })}
              </tbody>
            </TableLayout>
          )
        ) : (
          <>
            <h3>Добавтье первую компанию</h3>
            {companies && companies.length > 0 ? (
              <Link to="/new-order">
                <MyButton>Добавить запрос</MyButton>
              </Link>
            ) : (
              <Link to="/new-company">
                <MyButton>Добавить компанию</MyButton>
              </Link>
            )}
          </>
        )
      ) : (
        <Loader />
      )}
    </OrderLayout>
  );
};

export default OrdersListPage;
