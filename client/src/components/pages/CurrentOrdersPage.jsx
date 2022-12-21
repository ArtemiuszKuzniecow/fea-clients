import React, { useState } from "react";
import PropTypes from "prop-types";
import OrderCard from "../common/OrderCard";
import Loader from "../ui/Loader/Loader";
import { useEffect } from "react";
import useUserData from "../../hooks/useUserData";
import { useParams } from "react-router-dom";
import Headline from "../common/Headline";
import TableLayout from "../common/TableLayout";

const CurrentOrdersPage = () => {
  const [currentOrders, setCurrentOrders] = useState(null);
  const { id } = useParams();
  const { orders, isLoading, isOrdersLoading, getCompanyById } = useUserData();
  const company = getCompanyById(id);

  useEffect(() => {
    !isOrdersLoading &&
      company &&
      setCurrentOrders(orders.filter((o) => o.companyId === company._id));
  }, [isLoading, isOrdersLoading]);

  return currentOrders && company ? (
    currentOrders.length > 0 ? (
      <>
        <Headline>Запросы компании {company.company}</Headline>
        <TableLayout>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                Компания
              </th>
              <th scope="col" className="py-3 px-6 max-sm:hidden">
                <div className="flex items-center">Статус запроса</div>
              </th>
              <th scope="col" className="py-3 px-6 max-md:hidden">
                <div className="flex items-center">Статус груза</div>
              </th>
              <th scope="col" className="py-3 px-6 max-sm:hidden">
                <div className="flex items-center">Дата запроса</div>
              </th>
              <th scope="col" className="py-3 px-6 max-md:hidden">
                <div className="flex items-center">Вид перевозки</div>
              </th>
              <th scope="col" className="py-3 px-6 max-xl:hidden">
                <div className="flex items-center">Инкотермс</div>
              </th>
              <th scope="col" className="py-3 px-6 max-xl:hidden">
                <div className="flex items-center">Характер груза</div>
              </th>
              <th scope="col" className="py-3 px-6 max-xl:hidden">
                <div className="flex items-center">Вид контракта</div>
              </th>
              <th scope="col" className="py-3 px-6 lg:hidden"></th>
              <th scope="col" className="py-3 px-6 max-lg:hidden"></th>
              <th scope="col" className="py-3 px-6 max-lg:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((currentOrder) => {
              return (
                <OrderCard
                  order={currentOrder}
                  companyName={company.company}
                  key={currentOrder._id}
                  companyId={currentOrder.companyId}
                />
              );
            })}
          </tbody>
        </TableLayout>
      </>
    ) : (
      <div className="flex justify-center">
        <h5 className="font-medium leading-tight text-xl m-5 text-sky-600">
          Запросов нет
        </h5>
      </div>
    )
  ) : (
    <Loader />
  );
};

CurrentOrdersPage.propTyoes = {
  company: PropTypes.object,
};

export default CurrentOrdersPage;
