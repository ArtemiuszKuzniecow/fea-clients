import { nanoid } from "nanoid";
import React, { useState } from "react";
import MyButton from "../../common/Button/MyButton";
import DropDownList from "../../common/DropDownList/DropDownList";
import style from "./NewCompanyPage.module.scss";

const NewCompanyPage = () => {
  const currentCompanyId = nanoid();
  const [company, setCompany] = useState({
    city: "",
    company: "",
    contacts: {
      email: "",
      phone: "",
      website: "",
    },
    containersTypes: "",
    contractType: "",
    directions: "",
    id: currentCompanyId,
    isRequested: false,
    manager: "",
    sphere: "",
    status: { date: Date.now(), value: "Получил запрос" },
    userID: "",
  });
  return (
    <div>
      <h1>Добавить новую компанию:</h1>

      <div>
        <ul>
          <li>name</li>
        </ul>
        <ul>
          <li>manager</li>
          <li>phones</li>
          <li>city</li>
          <li>email</li>
          <li>website</li>
        </ul>
      </div>

      <div>
        <ul>
          <li>direction-</li>
        </ul>
        <div>dropdown cargotypes</div>
        <div>dropdown contract types</div>
        <div>status dropdown</div>
        <MyButton text="add company" />
      </div>
    </div>
  );
};

export default NewCompanyPage;
