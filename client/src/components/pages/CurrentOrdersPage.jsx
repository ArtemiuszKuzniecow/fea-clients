import React, { useState } from "react";
import PropTypes from "prop-types";
import OrderCard from "../common/OrderCard";
import Loader from "../ui/Loader/Loader";
import { useEffect } from "react";
import useUserData from "../../hooks/useUserData";
import { useParams } from "react-router-dom";
import Headline from "../common/Headline";
import { SortingArrowsImg } from "../../assets/styles/svg";
import TableLayout from "../common/TableLayout";

const CurrentOrdersPage = () => {
  const { _id } = useParams();
  const { orders, isLoading, isOrdersLoading, getCompanyById } = useUserData();
  const company = getCompanyById(_id);
  const [currentOrders, setCurrentOrders] = useState(null);

  useEffect(() => {
    !isOrdersLoading &&
      company &&
      setCurrentOrders(orders.filter((o) => o.companyId === company._id));
  }, [isLoading, isOrdersLoading, company]);

  console.log(currentOrders);

  return currentOrders && company ? (
    currentOrders.length > 0 ? (
      <>
        <Headline>Запросы компании {company.company}</Headline>
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
