import React, { useEffect, useState } from "react";
import declOfNum from "../../utils/declOfNum";
import getDateFormat, { today } from "../../utils/getDateFormat";
import useUserData from "../../hooks/useUserData";
import { getUserDataSelector } from "../../store/Users/selectors";
import Loader from "../ui/Loader/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Headline from "./Headline";
import MyButton from "./MyButton";

const MainPageContent = () => {
  const { userData: currentUser } = useSelector(getUserDataSelector());
  const {
    companies,
    orders,
    getCompanyById,
    isLoading,
    isLeadsLoading,
    isOrdersLoading,
  } = useUserData();
  const [companiesToConnect, setCompaniesToConnect] = useState([]);
  const [openedOrders, setOpenedOrders] = useState([]);
  const [isCompaniesCollapsed, setIsCompaniesCollapsed] = useState(true);
  const [isOrdersCollapsed, setIsOrdersCollapsed] = useState(true);
  const companiesEndingsArray = ["компания", "компании", "компаний"];

  const ordersEndingsArray = ["запрос", "запроса", "запросов"];

  const handleCompaniesCollapse = () => {
    setIsCompaniesCollapsed((prevState) => !prevState);
  };
  const handleOrdersCollapse = () => {
    setIsOrdersCollapsed((prevState) => !prevState);
  };

  const currentDate = getDateFormat(today, ".");

  useEffect(() => {
    companies &&
      setCompaniesToConnect(
        companies.filter(
          (c) => getDateFormat(c.status.date, ".") === currentDate
        )
      );
    orders && setOpenedOrders(orders.filter((o) => !o.isClosed));
  }, [isLoading, isLeadsLoading, isOrdersLoading]);

  return !isLoading && !isLeadsLoading && !isOrdersLoading ? (
    <>
      <Headline>Добрый день, {currentUser.name}!</Headline>
      <div className="flex justify-evenly">
        <div>
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm flex flex-col justify-center">
            <h4 className="text-gray-900 text-xl leading-tight font-medium mb-2">
              У Вас всего {companies.length}{" "}
              {declOfNum(companies.length, companiesEndingsArray)}:
            </h4>
            <Link to={companies.length > 0 ? "companies/" : "new-company"}>
              <MyButton>
                {companies.length > 0
                  ? "Посмотреть"
                  : "Добавьте новую компанию"}
              </MyButton>
            </Link>
          </div>
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm flex flex-col justify-center">
            <h4 className="text-gray-900 text-xl leading-tight font-medium mb-2">
              У Вас всего {orders.length}{" "}
              {declOfNum(orders.length, ordersEndingsArray)}:
            </h4>
            <Link to={orders.length > 0 ? "orders/" : "new-order"}>
              <MyButton>
                {companies.length > 0 ? "Посмотреть" : "Добавьте новый запрос"}
              </MyButton>
            </Link>
          </div>
        </div>
        <div>
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm flex flex-col justify-center">
            <h4 className="text-gray-900 text-xl leading-tight font-medium mb-2">
              {companiesToConnect.length > 0
                ? `У Вас всего ${companiesToConnect.length}
                ${declOfNum(
                  companiesToConnect.length,
                  companiesEndingsArray
                )} для связи сегодня:`
                : "Сегодня нет компаний для связи"}
            </h4>
            <div onClick={() => handleCompaniesCollapse()}>
              {companiesToConnect.length > 0 ? (
                isCompaniesCollapsed ? (
                  <MyButton>Посмотреть</MyButton>
                ) : (
                  <div>
                    <MyButton>Свернуть</MyButton>{" "}
                    {companiesToConnect.map((c) => (
                      <Link to={c._id} key={c._id}>
                        {c.company}
                      </Link>
                    ))}
                  </div>
                )
              ) : (
                <Link to="companies">
                  <MyButton>Посмотреть все компании</MyButton>
                </Link>
              )}
            </div>
          </div>
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm flex flex-col justify-center">
            <h4 className="text-gray-900 text-xl leading-tight font-medium mb-2">
              {openedOrders.length > 0
                ? `У Вас всего ${orders.length} открытых 
                ${declOfNum(orders.length, ordersEndingsArray)}:`
                : "У Вас нет открытых запросов"}
            </h4>
            <div onClick={() => handleOrdersCollapse()}>
              {openedOrders.length > 0 ? (
                isOrdersCollapsed ? (
                  <MyButton>Посмотреть</MyButton>
                ) : (
                  <div>
                    <MyButton>Свернуть</MyButton>
                    {openedOrders.map((o) => (
                      <Link to={`orders-list/${o.orderId}`} key={o.orderId}>
                        {`Компания: ${getCompanyById(o.companyId).company}`}
                        <br />
                        {`Дата запроса: ${getDateFormat(o.date, ".")}`}
                      </Link>
                    ))}
                  </div>
                )
              ) : (
                <Link to="/orders-list">
                  <MyButton>Посмотреть все запросы</MyButton>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default MainPageContent;
