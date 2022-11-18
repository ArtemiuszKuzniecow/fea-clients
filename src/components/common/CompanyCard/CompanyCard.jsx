import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import getDateFormat from "../../../assets/utils/getDateFormat";
import cargo from "../../../cargo.json";
import { editLeadParameter } from "../../../store/Leads/actions";
import MyButton from "../Button/MyButton";
import Comments from "../Comment/Comments";
import CompanyContacts from "../CompanyContacts/CompanyContacts";
import DropDownList from "../DropDownList/DropDownList";
import style from "./CompanyCard.module.scss";

const CompanyCard = ({ company }) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(null);
  const companyInformationData = [
    company.directions,
    company.sphere,
    company.contractType,
    company.containersTypes,
  ];

  const handleDisabled = () => {
    setDisabled((prevState) => !prevState);
  };

  const handleChangeData = ({ target }) => {
    const currentDate = new Date(target.value);
    setStatus((prevState) => ({ ...prevState, date: currentDate.getTime() }));
  };
  const handleChange = (data) => {
    setStatus((prevState) => ({ ...prevState, ...data }));
  };

  const refreshStatus = (data) => {
    dispatch(
      editLeadParameter({ payload: data, id: company.id, parameter: "status" })
    );
  };

  return (
    <div className={style.company_card_container}>
      <div className={style.company_card_title}>
        <h4>{company.company}</h4>
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
            sampleText={
              company.isRequested ? "Получил запрос" : company.status.value
            }
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
          />{" "}
          <MyButton text="OK" onClick={() => refreshStatus(status)} />
        </h5>
        <div className={style.company_card_status_header}>
          Связаться: {getDateFormat(company.status.date, ".")}
        </div>
        {company.isRequested ? (
          <Link to="/orders-list">
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
  company: PropTypes.object.isRequired,
};

export default CompanyCard;
