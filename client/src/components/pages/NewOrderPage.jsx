import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import cargo from "../../cargo.json";
import useUserData from "../../hooks/useUserData";
import { editLeadParameter } from "../../store/Leads/actions";
import { postNewOrder } from "../../store/Orders/actions";
import getDateFormat from "../../utils/getDateFormat";
import DropDownList from "../common/DropDownList";
import Headline from "../common/Headline";
import MyButton from "../common/MyButton";
import RadioButtons from "../common/RadioButtons";
import TextField from "../common/TextField";
import Loader from "../ui/Loader/Loader";

const NewOrderPage = () => {
  const { companies, isLoading, isLeadsLoading, currentUserData } =
    useUserData();
  const currentCompanies = companies && companies.map((c) => c.company);
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);
  const [order, setOrder] = useState({
    companyId: "",
    containersTypes: "",
    contractType: "",
    customs: "",
    date: Date.now(),
    deliveryAddress: "",
    hazard: "",
    howOften: "",
    hsCode: "",
    incoterms: "",
    isActual: false,
    isClosed: false,
    package: "",
    pickupAddress: "",
    pickupDate: "",
    price: "",
    special: "",
    status: "",
    temperature: "",
    transshipment: false,
    typeOfCargo: "",
    volume: "",
    weight: "",
    userID: currentUserData.userData._id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasBeenSubmited(true);
    if (
      order.companyId !== "" &&
      order.containersTypes !== "" &&
      order.contractType !== "" &&
      order.deliveryAddress !== "" &&
      order.pickupAddress !== "" &&
      order.typeOfCargo !== "" &&
      order.volume !== "" &&
      order.weight !== ""
    ) {
      dispatch(postNewOrder(order));
      dispatch(
        editLeadParameter({
          payload: true,
          _id: order.companyId,
          parameter: "isRequested",
        })
      );
      history.push("orders-list");
    }
  };

  const handleChange = (target) => {
    setOrder((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleChooseCompany = (data) => {
    setOrder((prevState) => ({
      ...prevState,
      companyId: companies.find((c) => c.company === data.companyId)._id,
    }));
  };
  const handleChangeDropDown = (data) => {
    setOrder((prevState) => ({ ...prevState, ...data }));
  };

  const handleChangeRadio = ({ target }) => {
    setOrder((prevState) => ({
      ...prevState,
      [target.name]: target.value === "yes",
    }));
  };

  return !isLoading && !isLeadsLoading && companies ? (
    <>
      <Headline>Добавить новый запрос:</Headline>
      <div className="container">
        <div className="flex flex-row justify-around flex-wrap gap-3 py-3">
          <div className="w-10/12">
            <div>
              <DropDownList
                array={currentCompanies}
                sampleText="Выберите компанию"
                onChange={handleChooseCompany}
                name="companyId"
              />
              {hasBeenSubmited && order.companyId === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
            <div>
              <DropDownList
                array={cargo.orderStatus}
                sampleText="Статус запроса"
                name="status"
                onChange={handleChangeDropDown}
              />
            </div>
            <div>
              <DropDownList
                array={cargo.containersTypes}
                sampleText="Вид перевозки"
                onChange={handleChangeDropDown}
                name="containersTypes"
              />
              {hasBeenSubmited && order.containersTypes === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
            <div>
              <DropDownList
                array={cargo.contractType}
                sampleText="Вид контракта"
                onChange={handleChangeDropDown}
                name="contractType"
              />
              {hasBeenSubmited && order.contractType === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
            <div>
              <DropDownList
                array={cargo.incoterms}
                sampleText="Инкотермс"
                onChange={handleChangeDropDown}
                name="incoterms"
              />
            </div>
            <div>
              {order.containersTypes === "Сборный груз" ||
              order.containersTypes === "Авиа" ? (
                <TextField
                  label="Объём груза:"
                  name="volume"
                  type="text"
                  onChange={handleChange}
                />
              ) : (
                <>
                  <DropDownList
                    array={cargo.volume}
                    sampleText="Объём груза"
                    name="volume"
                    onChange={handleChangeDropDown}
                  />
                  {hasBeenSubmited && order.volume === "" && (
                    <span>Это поле должно быть заполнено</span>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="w-1/3 max-md:w-10/12">
            <div>
              <TextField
                label="Как часто возит:"
                name="howOften"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                label="Вес груза:"
                name="weight"
                type="text"
                onChange={handleChange}
              />
              {hasBeenSubmited && order.weight === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
            <div>
              <TextField
                label="Характер груза:"
                name="typeOfCargo"
                type="text"
                onChange={handleChange}
              />
              {hasBeenSubmited && order.typeOfCargo === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
            <div>
              <TextField
                label="Код ТН ВЭД:"
                name="hsCode"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                label="Температурный режим:"
                name="temperature"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                label="Класс опасности:"
                name="hazard"
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-1/3 max-md:w-10/12">
            <div>
              <TextField
                label="Вид упаковки:"
                name="package"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                label="Дополнительная информация:"
                name="special"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                label="Адрес забора груза:"
                name="pickupAddress"
                type="text"
                onChange={handleChange}
              />
              {hasBeenSubmited && order.pickupAddress === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
            <div>
              <TextField
                label="Место таможенного оформления:"
                name="customs"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                label="Адрес доставки груза:"
                name="deliveryAddress"
                type="text"
                onChange={handleChange}
              />
              {hasBeenSubmited && order.deliveryAddress === "" && (
                <span>Это поле должно быть заполнено</span>
              )}
            </div>
            <div>
              <TextField
                label="Когда забирать:"
                name="pickupDate"
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-10/12 flex justify-between">
            <div>
              <h4>Актуальность груза:</h4>
              <RadioButtons onChange={handleChangeRadio} name="isActual" />
            </div>
            <div>
              <h4>Можно ли штабелировать:</h4>
              <RadioButtons onChange={handleChangeRadio} name="transshipment" />
            </div>
            <div>
              <h4>Дата запроса:</h4>
              <div>{getDateFormat(Date.now(), ".")}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <MyButton onClick={handleSubmit}>Отправить запрос</MyButton>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default NewOrderPage;
