import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";
import Comments from "../../common/Comment/Comments";
import CompanyContacts from "../../common/CompanyContacts/CompanyContacts";
import OrderCard from "../../common/OrderCard/OrderCard";
import Loader from "../../ui/Loader/Loader";
import style from "./CompanyInfoPage.module.scss";

const Card = ({ currentCompany }) => {
  return (
    <>
      <h1>{currentCompany.company}</h1>

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
    </>
  );
};

const CompanyInfoPage = () => {
  const { id } = useParams();
  const {
    isLoading,
    isLeadsLoading,
    isLeadsCommentsLoading,
    companies,
    orders,
  } = useUserData();

  const [currentCompany, setCurrentCompany] = useState();
  const [currentOrders, setCurrentOrders] = useState();

  useEffect(() => {
    if (companies && orders) {
      setCurrentCompany(companies.find((item) => item.id === id));
      setCurrentOrders(orders.filter((o) => o.companyId === id));
    }
  }, [isLoading, isLeadsLoading, isLeadsCommentsLoading]);

  console.log(currentCompany);

  return !isLoading && !isLeadsLoading ? (
    <>
      <div className={style.company_info_page_container}>
        <Card currentCompany={currentCompany} />
        <div className={style.company_info_page_item}>
          <Comments companyId={currentCompany.id} typeOfComments="company" />
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
