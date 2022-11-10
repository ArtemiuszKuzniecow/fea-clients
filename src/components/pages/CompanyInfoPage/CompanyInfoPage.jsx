import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CommmentsProvider } from "../../../hooks/useComments";
import {
  getIsLoadingStatus,
  getUserLeadsSelector,
  getUserOrdersSelector,
} from "../../../store/Users/selectors";
import Comments from "../../common/Comment/Comments";
import CompanyContacts from "../../common/CompanyContacts/CompanyContacts";
import OrderCard from "../../common/OrderCard/OrderCard";
import Loader from "../../ui/Loader/Loader";
import style from "./CompanyInfoPage.module.scss";

const CompanyInfoPage = () => {
  const { id } = useParams();
  const companies = useSelector(getUserLeadsSelector());
  const orders = useSelector(getUserOrdersSelector());
  const isLoading = useSelector(getIsLoadingStatus());
  const [currentCompany, setCurrentCompany] = useState();
  const [currentOrders, setCurrentOrders] = useState();

  useEffect(() => {
    if (companies && orders) {
      setCurrentCompany(companies.find((item) => item.id === id));
      setCurrentOrders(
        orders
          .map((order) => Object.values(order)[0])
          .filter((o) => o.companyId === id)
      );
    }
  }, [isLoading]);

  return currentCompany ? (
    <>
      <h1>{currentCompany.company}</h1>
      <div className={style.company_info_page_container}>
        <div className={style.company_info_page_item}>
          <CompanyContacts
            phone={currentCompany.contacts.phone}
            email={currentCompany.contacts.email}
            website={currentCompany.contacts.website}
            manager={currentCompany.manager}
            city={currentCompany.city}
          />
          <div className={style.company_info_page_frame_item}>
            <h4>Основные направления компании </h4>
            <p className={style.company_info_page_frame}>
              {currentCompany.directions}
            </p>
          </div>
          <hr />
          <div className={style.company_info_page_frame_item}>
            <h4>Виды перевозок </h4>{" "}
            <p className={style.company_info_page_frame}>
              {currentCompany.containersTypes}
            </p>
          </div>
          <hr />
          <div className={style.company_info_page_frame_item}>
            <h4>Вид контрактов </h4>{" "}
            <p className={style.company_info_page_frame}>
              {currentCompany.contractType}
            </p>
          </div>
          <hr />
        </div>
        <div className={style.company_info_page_item}>
          <CommmentsProvider>
            <Comments companyId={currentCompany.id} typeOfComments="company" />
          </CommmentsProvider>
        </div>
      </div>
      <div>
        {currentOrders.length >= 1 ? (
          currentOrders.map((currentOrder) => {
            return (
              <OrderCard
                order={currentOrder}
                companyName={currentCompany.company}
                key={currentOrder.orderId}
              />
            );
          })
        ) : (
          <h3>Запросов нет</h3>
        )}
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default CompanyInfoPage;
