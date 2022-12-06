import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import getDateFormat from "../../../utils/getDateFormat";
import cargo from "../../../cargo.json";
import useUserData from "../../../hooks/useUserData";
import { editLeadParameter } from "../../../store/Leads/actions";
import { postNewOrder } from "../../../store/Orders/actions";
import MyButton from "../../common/Button/MyButton";
import DropDownList from "../../common/DropDownList/DropDownList";
import RadioButtons from "../../common/Form/RadioButtons/RadioButtons";
import TextField from "../../common/Form/TextField/TextField";
import Loader from "../../ui/Loader/Loader";

const NewOrderPage = () => {
  const { companies, isLoading, isLeadsLoading, currentUserData } =
    useUserData();
  const currentCompanies = companies && companies.map((c) => c.company);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentOrderId = nanoid();
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
    orderId: currentOrderId,
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
    userID: currentUserData.userData.id,
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
          id: order.companyId,
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
      companyId: companies.find((c) => c.company === data.companyId).id,
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
      <h1>Добавить новый запрос:</h1>
      <div>
        <div>
          <h4>Выберите компанию:</h4>
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
          <h4>Статус запроса:</h4>
          <DropDownList
            array={cargo.orderStatus}
            sampleText="Статус запроса"
            name="status"
            onChange={handleChangeDropDown}
          />
        </div>
        <div>
          <h4>Вид перевозки:</h4>
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
          <h4>Вид контракта:</h4>
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
          <h4>Инкотермс:</h4>
          <DropDownList
            array={cargo.incoterms}
            sampleText="Инкотермс"
            onChange={handleChangeDropDown}
            name="incoterms"
          />
        </div>
        <div>
          <h4>Объём груза:</h4>
          {order.containersTypes === "Сборный груз" ||
          order.containersTypes === "Авиа" ? (
            <TextField name="volume" type="text" onChange={handleChange} />
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
        </div>{" "}
        <div>
          <h4>Как часто возит:</h4>
          <TextField name="howOften" type="text" onChange={handleChange} />
        </div>
        <div>
          <h4>Вес груза:</h4>{" "}
          <TextField name="weight" type="text" onChange={handleChange} />
          {hasBeenSubmited && order.weight === "" && (
            <span>Это поле должно быть заполнено</span>
          )}
        </div>
        <div>
          <h4>Характер груза:</h4>
          <TextField name="typeOfCargo" type="text" onChange={handleChange} />
          {hasBeenSubmited && order.typeOfCargo === "" && (
            <span>Это поле должно быть заполнено</span>
          )}
        </div>
        <div>
          <h4>Код ТН ВЭД:</h4>
          <TextField name="hsCode" type="text" onChange={handleChange} />
        </div>
        <div>
          <h4>Температурный режим:</h4>
          <TextField name="temperature" type="text" onChange={handleChange} />
        </div>
        <div>
          <h4>Класс опасности:</h4>
          <TextField name="hazard" type="text" onChange={handleChange} />
        </div>
        <div>
          <h4>Вид упаковки:</h4>
          <TextField name="package" type="text" onChange={handleChange} />
        </div>
        <div>
          <h4>Дополнительная информация:</h4>
          <TextField name="special" type="text" onChange={handleChange} />
        </div>
        <div>
          <h4>Адрес забора груза:</h4>
          <TextField name="pickupAddress" type="text" onChange={handleChange} />
          {hasBeenSubmited && order.pickupAddress === "" && (
            <span>Это поле должно быть заполнено</span>
          )}
        </div>
        <div>
          <h4>Место таможенного оформления:</h4>
          <TextField name="customs" type="text" onChange={handleChange} />
        </div>
        <div>
          <h4>Адрес доставки груза:</h4>
          <TextField
            name="deliveryAddress"
            type="text"
            onChange={handleChange}
          />
          {hasBeenSubmited && order.deliveryAddress === "" && (
            <span>Это поле должно быть заполнено</span>
          )}
        </div>
        <div>
          <h4>Когда забирать:</h4>
          <TextField name="pickupDate" type="text" onChange={handleChange} />
        </div>
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

      <MyButton text="Отправить запрос" onClick={handleSubmit} />
    </>
  ) : (
    <Loader />
  );
};

export default NewOrderPage;
