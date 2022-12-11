import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import cargo from "../../cargo.json";
import useUserData from "../../hooks/useUserData";
import { postNewLead } from "../../store/Leads/actions";
import DropDownList from "../common/DropDownList";
import Headline from "../common/Headline";
import MyButton from "../common/MyButton";
import TextField from "../common/TextField";
import Loader from "../ui/Loader/Loader";

const NewCompanyPage = () => {
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
        isRequested: false,
        manager: "",
        sphere: "",
        status: { date: Date.now(), value: "Отправил КП" },
        userID: currentUserData.userData._id,
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
      <Headline>Добавить новую компанию:</Headline>
      <div className="container">
        <div className="flex flex-row justify-around flex-wrap gap-3 py-3">
          <div className="w-1/3 max-md:w-10/12">
            <div>
              <TextField
                label="Название компании:"
                type="text"
                name="company"
                onChange={handleChange}
              />
              {hasBeenSubmited && company.company === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
            <div>
              <TextField
                label="Имя сотрудника:"
                type="text"
                name="manager"
                onChange={handleChange}
              />
              {hasBeenSubmited && company.manager === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
            <div>
              <TextField
                label="Телефоны:"
                type="text"
                name="phone"
                onChange={handleContactsChange}
              />
            </div>
            <div>
              <TextField
                label="Город:"
                type="text"
                name="city"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-1/3 max-md:w-10/12">
            <div>
              <TextField
                label="Электронная почта:"
                type="text"
                name="email"
                onChange={handleContactsChange}
              />
            </div>
            <div>
              <TextField
                label="Сайт:"
                type="text"
                name="website"
                onChange={handleContactsChange}
              />
            </div>
            <div>
              <TextField
                label="Основные направления:"
                type="text"
                name="directions"
                onChange={handleChange}
              />
              {hasBeenSubmited && company.directions === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
            <div>
              <TextField
                label="Сфера деятельности:"
                type="text"
                name="sphere"
                onChange={handleChange}
              />
              {hasBeenSubmited && company.sphere === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
          </div>

          <div className="w-1/2 max-md:w-10/12">
            <div>
              <DropDownList
                array={cargo.containersTypes}
                sampleText="Виды грузоперевозок"
                onChange={handleChangeDropDown}
                name="containersTypes"
              />
            </div>
            <div>
              <DropDownList
                array={cargo.contractType}
                sampleText="Виды контрактов"
                onChange={handleChangeDropDown}
                name="contractType"
              />
            </div>
            <div>
              <DropDownList
                array={cargo.clientStatusArray}
                sampleText="Статус"
                onChange={handleChangeStatus}
                name="status"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container flex justify-center">
        <MyButton onClick={handleSubmit}>Добавить компанию</MyButton>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default NewCompanyPage;
