import React, { useEffect, useState } from "react";
import declOfNum from "../../../utils/declOfNum";
import getDateFormat, { today } from "../../../utils/getDateFormat";
import useUserData from "../../../hooks/useUserData";
import { getUserDataSelector } from "../../../store/Users/selectors";
import Loader from "../../ui/Loader/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Headline from "../Headline";

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
      <div>
        <div>
          <h4>
            У Вас всего {companies.length}{" "}
            {declOfNum(companies.length, companiesEndingsArray)}:
          </h4>
          <div>
            <Link to="companies/">Посмотреть</Link>
          </div>
          <h4>
            У Вас всего {orders.length}{" "}
            {declOfNum(orders.length, ordersEndingsArray)}:
          </h4>
          <div>
            <Link to="orders-list">Посмотреть</Link>
          </div>
        </div>
        <div>
          <h4>
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
                <span>Посмотреть</span>
              ) : (
                <div>
                  <span>Свернуть</span>{" "}
                  {companiesToConnect.map((c) => (
                    <Link to={c.id} key={c.id}>
                      {c.company}
                    </Link>
                  ))}
                </div>
              )
            ) : (
              <Link to="companies">Посмотреть все компании</Link>
            )}
          </div>

          <h4>
            {openedOrders.length > 0
              ? `У Вас всего ${orders.length} открытых 
                ${declOfNum(orders.length, ordersEndingsArray)}:`
              : "У Вас нет открытых запросов"}
          </h4>
          <div onClick={() => handleOrdersCollapse()}>
            {openedOrders.length > 0 ? (
              isOrdersCollapsed ? (
                <span>Посмотреть</span>
              ) : (
                <div>
                  <span>Свернуть</span>
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
              "Посмотреть все запросы"
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default MainPageContent;
