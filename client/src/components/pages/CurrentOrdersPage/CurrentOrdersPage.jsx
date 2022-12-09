import React, { useState } from "react";
import PropTypes from "prop-types";
import OrderCard from "../../common/OrderCard/OrderCard";
import Loader from "../../ui/Loader/Loader";
import { useEffect } from "react";
import useUserData from "../../../hooks/useUserData";
import { useParams } from "react-router-dom";
import Headline from "../../common/Headline";
import { SortingArrowsImg } from "../../../assets/styles/svg";

const CurrentOrdersPage = () => {
  const { id } = useParams();
  const { orders, isLoading, isOrdersLoading, getCompanyById } = useUserData();
  const company = getCompanyById(id);
  const [currentOrders, setCurrentOrders] = useState(null);

  useEffect(() => {
    !isOrdersLoading &&
      setCurrentOrders(orders.filter((o) => o.companyId === company.id));
  }, [isLoading, isOrdersLoading]);

  return currentOrders ? (
    <>
      <Headline>Запросы компании {company.company}</Headline>
      <div className="container">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
              {currentOrders.map((currentOrder) => {
                return (
                  <OrderCard
                    order={currentOrder}
                    companyName={company.company}
                    key={currentOrder.orderId}
                    companyId={currentOrder.companyId}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

CurrentOrdersPage.propTyoes = {
  company: PropTypes.object,
};

export default CurrentOrdersPage;
