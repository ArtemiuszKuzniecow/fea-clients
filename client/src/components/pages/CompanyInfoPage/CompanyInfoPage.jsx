import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";
import { deleteLead } from "../../../store/Leads/actions";
import { deleteCompanyComment } from "../../../store/LeadsComments/actions";
import { getAllCompanyComments } from "../../../store/LeadsComments/selecetors";
import { deleteOrder } from "../../../store/Orders/actions";
import { deleteOrderComment } from "../../../store/OrdersComments/actions";
import { getAllOrdersComments } from "../../../store/OrdersComments/selectors";
import MyButton from "../../common/Button/MyButton";
import Comments from "../../common/Comment/Comments";
import CompanyContacts from "../../common/CompanyContacts/CompanyContacts";
import ModalContent from "../../common/ModalContent/ModalContent";
import ModalWindow from "../../common/ModalWindow/ModalWindow";
import OrderCard from "../../common/OrderCard/OrderCard";
import Loader from "../../ui/Loader/Loader";
import style from "./CompanyInfoPage.module.scss";

const CompanyInfoPage = () => {
  const { id } = useParams();
  const { isLoading, isLeadsLoading, isOrdersLoading, companies, orders } =
    useUserData();
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentCompany, setCurrentCompany] = useState();
  const [currentOrders, setCurrentOrders] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const leadsComments = useSelector(getAllCompanyComments(id));
  const ordersComments = useSelector(getAllOrdersComments());

  useEffect(() => {
    if (companies && orders) {
      setCurrentCompany(companies.find((item) => item.id === id));
      setCurrentOrders(orders.filter((o) => o.companyId === id));
    }
  }, [isLoading, isLeadsLoading, isOrdersLoading]);

  const handleDeleteCompany = (currentCompany) => {
    dispatch(deleteLead(currentCompany));
    leadsComments &&
      leadsComments.forEach((c) => dispatch(deleteCompanyComment(c)));
    ordersComments &&
      ordersComments.forEach((c) => {
        if (currentOrders.map((o) => o.orderId).includes(c.orderId)) {
          dispatch(deleteOrderComment(c));
        }
      });
    orders && currentOrders.forEach((o) => dispatch(deleteOrder(o)));
    history.push("/companies");
  };

  return !isLoading && !isLeadsLoading && !isOrdersLoading ? (
    currentCompany && (
      <>
        <div className={style.company_info_page_container}>
          <div className={style.company_info_page_item}>
            <h1>{currentCompany.company}</h1>
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
              <h4>Тип контракта:</h4>
              <p className={style.company_info_page_frame}>
                {currentCompany.contractType}
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
            <Link to={`${id}/edit`}>
              <MyButton text="Изменить информацию о компании" />
            </Link>
            <hr />
            <MyButton
              text="Удалить компанию из базы"
              onClick={() => setIsOpen((prevState) => !prevState)}
            />
            <ModalWindow
              open={isOpen}
              onClose={() => setIsOpen((prevState) => !prevState)}
            >
              <ModalContent
                deleteFunc={() => handleDeleteCompany(currentCompany)}
                openFunc={() => setIsOpen((prevState) => !prevState)}
                item="компанию"
              />
            </ModalWindow>
          </div>
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
    )
  ) : (
    <Loader />
  );
};

export default CompanyInfoPage;
