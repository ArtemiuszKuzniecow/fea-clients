import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import cargo from "../../../cargo.json";
import MyButton from "../Button/MyButton";
import Comments from "../Comment/Comments";
import CompanyContacts from "../CompanyContacts/CompanyContacts";
import DropDownList from "../DropDownList/DropDownList";
import TextField from "../Form/TextField/TextField";
import style from "./CompanyCard.module.scss";

const CompanyCard = ({ company }) => {
  const [status, setStatus] = useState({
    status: "Выбрать действие",
    date: "",
  });
  const [disabled, setDisabled] = useState(false);
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
    setStatus((prevState) => ({
      ...prevState,
      date: target.value,
    }));
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
            array={cargo.clientStatusArray}
            sampleText={status.status}
          />
        </div>

        <div className={style.company_card_status_header}>
          <TextField
            type="text"
            name="date"
            onChange={handleChangeData}
            hasButton={true}
            disabled={disabled}
            onClick={handleDisabled}
            buttonText={disabled ? "Редактировать" : "ОК"}
          />
          <br />
          Связаться: {company.status.date}
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
