import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import cargo from "../../cargo.json";
import useUserData from "../../hooks/useUserData";
import { editLead } from "../../store/Leads/actions";
import DropDownList from "../common/DropDownList";
import Headline from "../common/Headline";
import MyButton from "../common/MyButton";
import TextField from "../common/TextField";
import Loader from "../ui/Loader/Loader";

const EditCompanyPage = () => {
  const { id } = useParams();
  const { getCompanyById } = useUserData();
  const currentCompany = getCompanyById(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [company, setCompany] = useState(currentCompany);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editLead(company));
    navigate.push(`/${id}`);
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
      <div className="flex flex-col justify-center p-3">
        <Headline>Редактирвоать данные:</Headline>
        <Link to={`/${id}`}>
          <MyButton>Назад</MyButton>
        </Link>
      </div>
      <div className="container">
        <div className="flex flex-row justify-around flex-wrap gap-3 py-3">
          <div className="w-1/3 max-md:w-10/12">
            <div>
              <TextField
                type="text"
                name="company"
                onChange={handleChange}
                value={currentCompany.company}
                label="Название компании:"
              />
            </div>
            <div>
              <TextField
                type="text"
                name="manager"
                onChange={handleChange}
                value={currentCompany.manager}
                label="Имя сотрудника: "
              />
            </div>
            <div>
              <TextField
                type="text"
                name="phone"
                onChange={handleContactsChange}
                value={currentCompany.contacts.phone}
                label="Телефоны: "
              />
            </div>
            <div>
              <TextField
                type="text"
                name="city"
                onChange={handleChange}
                value={currentCompany.city}
                label="Город:"
              />
            </div>
          </div>
          <div className="w-1/3 max-md:w-10/12">
            <div>
              <TextField
                type="text"
                name="email"
                onChange={handleContactsChange}
                value={currentCompany.contacts.email}
                label="Электронная почта:"
              />
            </div>
            <div>
              <TextField
                type="text"
                name="website"
                onChange={handleContactsChange}
                value={currentCompany.contacts.website}
                label="Сайт:"
              />
            </div>
            <div>
              <TextField
                type="text"
                name="directions"
                onChange={handleChange}
                value={currentCompany.directions}
                label="Основные направления:"
              />
            </div>
            <div>
              <TextField
                type="text"
                name="sphere"
                onChange={handleChange}
                value={currentCompany.sphere}
                label="Сфера деятельности:"
              />
            </div>
          </div>
          <div className="w-1/3 max-md:w-10/12">
            <h4>Виды грузоперевозок: </h4>
            <DropDownList
              sampleText={currentCompany.containersTypes}
              name="containersTypes"
              array={cargo.containersTypes}
              onChange={handleChangeDropDown}
            />
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
      <div className="container flex justify-center">
        <MyButton onClick={handleSubmit}>Сохранить изменения</MyButton>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default EditCompanyPage;
