import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import localStorageService from "../../../assets/services/localStorageService";
import declOfNum from "../../../assets/utils/declOfNum";
import getDateFormat, { today } from "../../../assets/utils/getDateFormat";
import useUserData from "../../../hooks/useUserData";
import { getUserDataSelector } from "../../../store/Users/selectors";
import Loader from "../../ui/Loader/Loader";
import style from "./MainPage.module.scss";

const MainPage = () => {
  const accessToken = localStorageService.getAccessToken();
  const { userData: currentUser } = useSelector(getUserDataSelector());
  const { companies, orders, isLoading, isLeadsLoading, isOrdersLoading } =
    useUserData();
  const [companiesToConnect, setCompaniesToConnect] = useState([]);
  const [openedOrders, setOpenedOrders] = useState([]);
  const companiesEndingsArray = ["компания", "компании", "компаний"];
  const companiesToConnectEndingsArray = [
    "компанией",
    "компаниями",
    "компаниями",
  ];
  const ordersEndingsArray = ["запрос", "запроса", "запросов"];

  const currentDate = getDateFormat(today, ".");

  useEffect(() => {
    companies &&
      setCompaniesToConnect(
        companies.filter((c) => getDateFormat(c.status.date) === currentDate)
      );
    orders && setOpenedOrders(orders.filter((o) => !o.isClosed));
  }, [isLoading, isLeadsLoading, isOrdersLoading]);

  return (
    <>
      {accessToken ? (
        !isLoading && !isLeadsLoading && !isOrdersLoading ? (
          <>
            <h3>Добрый день, {currentUser.name}!</h3>
            <div className={style.container}>
              <div>
                <h4>
                  У Вас всего {companies.length}{" "}
                  {declOfNum(companies.length, companiesEndingsArray)}:
                </h4>
                <div className={style.frame}>Посмотреть</div>
                <h4>
                  У Вас всего {orders.length}{" "}
                  {declOfNum(orders.length, ordersEndingsArray)}:
                </h4>
                <div className={style.frame}>Посмотреть</div>
              </div>
              <div>
                <h4>
                  {companiesToConnect.length > 0
                    ? `У Вас всего ${companiesToConnect.length}
                  ${declOfNum(
                    companiesToConnect.length,
                    companiesToConnectEndingsArray
                  )} для связи:`
                    : "Сегодня нет компаний для связи"}
                </h4>
                <div className={style.frame}>
                  {companiesToConnect.length > 0
                    ? "Посмотреть"
                    : "Посмотреть все компании"}
                </div>

                <h4>
                  {openedOrders.length > 0
                    ? `У Вас всего ${orders.length} открытых 
                  ${declOfNum(orders.length, ordersEndingsArray)}:`
                    : "У Вас нет открытых запросов"}
                </h4>
                <div className={style.frame}>
                  {openedOrders.length > 0
                    ? "Посмотреть"
                    : "Посмотреть все запросы"}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )
      ) : (
        <div className={style.container}>
          <div>
            <h3>Пожалуйста, зарегистрируйтесь в системе!</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
