import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import cargo from "../../../cargo.json";
import useUserData from "../../../hooks/useUserData";
import { postNewLead } from "../../../store/Leads/actions";
import MyButton from "../../common/Button/MyButton";
import DropDownList from "../../common/DropDownList/DropDownList";
import TextField from "../../common/Form/TextField/TextField";
import Loader from "../../ui/Loader/Loader";

const EditCompanyPage = () => {
  const { id } = useParams();
  const { getCompanyById } = useUserData();
  const currentCompany = getCompanyById(id);
  const dispatch = useDispatch();
  const history = useHistory();
  const [company, setCompany] = useState(currentCompany);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewLead(company));
    history.push(`/${id}`);
  };

  const handleChangeDropDown = (data) => {
    setCompany((prevState) => ({ ...prevState, ...data }));
  };
  const handleChange = (target) => {
    setCompany((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleContactsChange = (target) => {
    setCompany((prevState) => ({
      ...prevState,
      contacts: { ...prevState.contacts, [target.name]: target.value },
    }));
  };

  return currentCompany ? (
    <>
      <div>
        <h1>Редактирвоать данные:</h1>
        <Link to={`/${id}`}>
          <MyButton text="Назад" />
        </Link>
      </div>
      <div>
        <div>
          <div>
            <h4>Название компании: </h4>
            <TextField
              type="text"
              name="company"
              onChange={handleChange}
              value={currentCompany.company}
            />
          </div>
          <div>
            <h4>Имя сотрудника: </h4>
            <TextField
              type="text"
              name="manager"
              onChange={handleChange}
              value={currentCompany.manager}
            />
          </div>
          <div>
            <h4>Телефоны: </h4>
            <TextField
              type="text"
              name="phone"
              onChange={handleContactsChange}
              value={currentCompany.contacts.phone}
            />
          </div>
          <div>
            <h4>Город: </h4>
            <TextField
              type="text"
              name="city"
              onChange={handleChange}
              value={currentCompany.city}
            />
          </div>
          <div>
            <h4>Электронная почта: </h4>
            <TextField
              type="text"
              name="email"
              onChange={handleContactsChange}
              value={currentCompany.contacts.email}
            />
          </div>
          <div>
            <h4>Сайт: </h4>
            <TextField
              type="text"
              name="website"
              onChange={handleContactsChange}
              value={currentCompany.contacts.website}
            />
          </div>
          <div>
            <h4>Основные направления: </h4>
            <TextField
              type="text"
              name="directions"
              onChange={handleChange}
              value={currentCompany.directions}
            />
          </div>
          <div>
            <h4>Сфера деятельности: </h4>
            <TextField
              type="text"
              name="sphere"
              onChange={handleChange}
              value={currentCompany.sphere}
            />
          </div>
        </div>

        <div>
          <div>
            <h4>Виды грузоперевозок: </h4>
            <DropDownList
              sampleText={currentCompany.containersTypes}
              name="containersTypes"
              array={cargo.containersTypes}
              onChange={handleChangeDropDown}
            />
          </div>
          <div>
            <h4>Виды контрактов: </h4>
            <DropDownList
              array={cargo.contractType}
              onChange={handleChangeDropDown}
              sampleText={currentCompany.contractType}
              name="contractType"
            />
          </div>
        </div>
      </div>
      <br />
      <MyButton text="Сохранить изменения" onClick={handleSubmit} />
    </>
  ) : (
    <Loader />
  );
};

export default EditCompanyPage;
