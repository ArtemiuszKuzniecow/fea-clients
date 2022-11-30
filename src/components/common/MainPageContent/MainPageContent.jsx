import React, { useEffect, useState } from "react";
import style from "./MainPageContent.module.scss";
import declOfNum from "../../../utils/declOfNum";
import getDateFormat, { today } from "../../../utils/getDateFormat";
import useUserData from "../../../hooks/useUserData";
import { getUserDataSelector } from "../../../store/Users/selectors";
import Loader from "../../ui/Loader/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
      <h3>Добрый день, {currentUser.name}!</h3>
      <div className={style.container}>
        <div className={style.container_item}>
          <h4>
            У Вас всего {companies.length}{" "}
            {declOfNum(companies.length, companiesEndingsArray)}:
          </h4>
          <div className={style.frame}>
            <Link to="companies/" className={style.link}>
              Посмотреть
            </Link>
          </div>
          <h4>
            У Вас всего {orders.length}{" "}
            {declOfNum(orders.length, ordersEndingsArray)}:
          </h4>
          <div className={style.frame}>
            <Link to="orders-list" className={style.link}>
              Посмотреть
            </Link>
          </div>
        </div>
        <div className={style.container_item}>
          <h4>
            {companiesToConnect.length > 0
              ? `У Вас всего ${companiesToConnect.length}
                ${declOfNum(
                  companiesToConnect.length,
                  companiesEndingsArray
                )} для связи сегодня:`
              : "Сегодня нет компаний для связи"}
          </h4>
          <div
            className={style.frame}
            onClick={() => handleCompaniesCollapse()}
          >
            {companiesToConnect.length > 0 ? (
              isCompaniesCollapsed ? (
                <span>Посмотреть</span>
              ) : (
                <div className={style.list}>
                  <span>Свернуть</span>{" "}
                  {companiesToConnect.map((c) => (
                    <Link to={c.id} className={style.link} key={c.id}>
                      {c.company}
                    </Link>
                  ))}
                </div>
              )
            ) : (
              <Link to="companies" className={style.link}>
                Посмотреть все компании
              </Link>
            )}
          </div>

          <h4>
            {openedOrders.length > 0
              ? `У Вас всего ${orders.length} открытых 
                ${declOfNum(orders.length, ordersEndingsArray)}:`
              : "У Вас нет открытых запросов"}
          </h4>
          <div className={style.frame} onClick={() => handleOrdersCollapse()}>
            {openedOrders.length > 0 ? (
              isOrdersCollapsed ? (
                <span>Посмотреть</span>
              ) : (
                <div className={style.list}>
                  <span>Свернуть</span>
                  {openedOrders.map((o) => (
                    <Link
                      to={`orders-list/${o.orderId}`}
                      className={style.link}
                      key={o.orderId}
                    >
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
