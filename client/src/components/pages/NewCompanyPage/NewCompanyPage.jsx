import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import cargo from "../../../cargo.json";
import useUserData from "../../../hooks/useUserData";
import { postNewLead } from "../../../store/Leads/actions";
import MyButton from "../../common/Button/MyButton";
import DropDownList from "../../common/DropDownList/DropDownList";
import TextField from "../../common/Form/TextField/TextField";
import Loader from "../../ui/Loader/Loader";

const NewCompanyPage = () => {
  const currentCompanyId = nanoid();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, currentUserData } = useUserData();
  const [company, setCompany] = useState(null);
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);

  useEffect(() => {
    !isLoading &&
      setCompany({
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
        status: { date: Date.now(), value: "Отправил КП" },
        userID: currentUserData.userData.id,
      });
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasBeenSubmited(true);
    if (
      company.company !== "" &&
      company.manager !== "" &&
      company.directions !== "" &&
      company.sphere !== ""
    ) {
      dispatch(postNewLead(company));
      history.push("/companies");
    }
  };

  const handleChangeDropDown = (data) => {
    setCompany((prevState) => ({ ...prevState, ...data }));
  };
  const handleChangeStatus = (data) => {
    setCompany((prevState) => ({ ...prevState, value: data }));
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

  return !isLoading ? (
    <>
      <h1>Добавить новую компанию:</h1>
      <div>
        <div>
          <div>
            <h4>Название компании: </h4>
            <TextField type="text" name="company" onChange={handleChange} />
            {hasBeenSubmited && company.company === "" && (
              <span>Это поле должно быть заполнено</span>
            )}
          </div>
          <div>
            <h4>Имя сотрудника: </h4>
            <TextField type="text" name="manager" onChange={handleChange} />
            {hasBeenSubmited && company.manager === "" && (
              <span>Это поле должно быть заполнено</span>
            )}
          </div>
          <div>
            <h4>Телефоны: </h4>
            <TextField
              type="text"
              name="phone"
              onChange={handleContactsChange}
            />
          </div>
          <div>
            <h4>Город: </h4>
            <TextField type="text" name="city" onChange={handleChange} />
          </div>
          <div>
            <h4>Электронная почта: </h4>
            <TextField
              type="text"
              name="email"
              onChange={handleContactsChange}
            />
          </div>
          <div>
            <h4>Сайт: </h4>
            <TextField
              type="text"
              name="website"
              onChange={handleContactsChange}
            />
          </div>
          <div>
            <h4>Основные направления: </h4>
            <TextField type="text" name="directions" onChange={handleChange} />
            {hasBeenSubmited && company.directions === "" && (
              <span>Это поле должно быть заполнено</span>
            )}
          </div>
          <div>
            <h4>Сфера деятельности: </h4>
            <TextField type="text" name="sphere" onChange={handleChange} />
            {hasBeenSubmited && company.sphere === "" && (
              <span>Это поле должно быть заполнено</span>
            )}
          </div>
        </div>
        <div>
          <div>
            <h4>Виды грузоперевозок: </h4>
            <DropDownList
              array={cargo.containersTypes}
              sampleText="Виды грузоперевозок"
              onChange={handleChangeDropDown}
              name="containersTypes"
            />
          </div>
          <div>
            <h4>Виды контрактов: </h4>
            <DropDownList
              array={cargo.contractType}
              sampleText="Виды контрактов"
              onChange={handleChangeDropDown}
              name="contractType"
            />
          </div>
          <div>
            <h4>Статус: </h4>
            <DropDownList
              array={cargo.clientStatusArray}
              sampleText="Статус"
              onChange={handleChangeStatus}
              name="status"
            />
          </div>
        </div>
      </div>
      <br />
      <MyButton onClick={handleSubmit}>Добавить компанию</MyButton>
    </>
  ) : (
    <Loader />
  );
};

export default NewCompanyPage;
