import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import getDateFormat from "../../../utils/getDateFormat";
import cargo from "../../../cargo.json";
import useUserData from "../../../hooks/useUserData";
import { deleteLead, editLeadParameter } from "../../../store/Leads/actions";
import { deleteCompanyComment } from "../../../store/LeadsComments/actions";
import { getAllCompanyComments } from "../../../store/LeadsComments/selecetors";
import { deleteOrder } from "../../../store/Orders/actions";
import { deleteOrderComment } from "../../../store/OrdersComments/actions";
import { getAllOrdersComments } from "../../../store/OrdersComments/selectors";
import MyButton from "../Button/MyButton";
import Comments from "../Comment/Comments";
import CompanyContacts from "../CompanyContacts/CompanyContacts";
import DropDownList from "../DropDownList/DropDownList";
import ModalContent from "../ModalContent/ModalContent";
import ModalWindow from "../ModalWindow/ModalWindow";
import style from "./CompanyCard.module.scss";

const CompanyCard = ({ companyId }) => {
  const dispatch = useDispatch();
  const { getCompanyById } = useUserData();
  const company = getCompanyById(companyId);
  const [status, setStatus] = useState({
    date: company.status.date,
    value: company.status.value,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [currentOrders, setCurrentOrders] = useState();
  const companyInformationData = [
    company.directions,
    company.sphere,
    company.contractType,
    company.containersTypes,
  ];

  const { orders, isLoading, isOrdersLoading } = useUserData();
  const leadsComments = useSelector(getAllCompanyComments(company.id));
  const ordersComments = useSelector(getAllOrdersComments());
  const history = useHistory();

  useEffect(() => {
    if (orders) {
      setCurrentOrders(orders.filter((o) => o.companyId === company.id));
    }
  }, [isLoading, isOrdersLoading]);

  const handleDeleteCompany = () => {
    dispatch(deleteLead(company));
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

  const handleChangeData = ({ target }) => {
    const currentDate = new Date(target.value);
    setStatus((prevState) => ({ ...prevState, date: currentDate.getTime() }));
  };
  const handleChange = (data) => {
    setStatus((prevState) => ({ ...prevState, ...data }));
  };

  const refreshStatus = () => {
    dispatch(
      editLeadParameter({
        payload: status,
        id: company.id,
        parameter: "status",
      })
    );
  };

  return (
    <div className={style.company_card_container}>
      <div className={style.company_card_title}>
        <h3>{company.company}</h3>
        {cargo.companyInformation.map((information, index) => (
          <div key={information}>
            {information}:
            <span className={style.company_card_title_frame}>
              {companyInformationData[index]}
            </span>
          </div>
        ))}
        <hr />
        <Link to={"/" + company.id}>
          <MyButton text="Информация о компании" />
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
            deleteFunc={() => handleDeleteCompany(company)}
            openFunc={() => setIsOpen((prevState) => !prevState)}
            item="компанию"
          />
        </ModalWindow>
      </div>
      <div className={style.company_card_contacts}>
        <CompanyContacts
          phone={company.contacts.phone}
          email={company.contacts.email}
          website={company.contacts.website}
          manager={company.manager}
          city={company.city}
        />
      </div>

      <div className={style.company_card_status}>
        <div className={style.company_card_status_header}>
          <DropDownList
            array={
              company.isRequested
                ? cargo.clientStatusArray.filter((s, i) => i > 2)
                : cargo.clientStatusArray.filter((s, i) => i !== 3)
            }
            sampleText={company.status.value}
            onChange={handleChange}
            name="value"
          />
        </div>

        <h5>
          <label htmlFor="date">Когда связаться: </label>
          <input
            className={style.company_card_status_calendar}
            type="date"
            id="date"
            onChange={handleChangeData}
          />
          <MyButton text="OK" onClick={() => refreshStatus()} />
        </h5>
        <div className={style.company_card_status_header}>
          Связаться: {getDateFormat(company.status.date, ".")}
        </div>
        {company.isRequested ? (
          <Link to={`${company.id}/orders`}>
            <MyButton
              isDisabled={!company.isRequested}
              text="Посмотреть все запросы"
            />
          </Link>
        ) : (
          <div>Запросов нет</div>
        )}
      </div>

      <div className={style.company_card_comment}>
        <Comments companyId={company.id} typeOfComments="company" />
      </div>
    </div>
  );
};

CompanyCard.propTypes = {
  companyId: PropTypes.string.isRequired,
};

export default CompanyCard;
