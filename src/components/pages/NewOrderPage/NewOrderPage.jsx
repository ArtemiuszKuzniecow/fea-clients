import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import getDateFormat from "../../../assets/utils/getDateFormat";
import cargo from "../../../cargo.json";
import useUserData from "../../../hooks/useUserData";
import { editLeadParameter } from "../../../store/Leads/actions";
import { postNewOrder } from "../../../store/Orders/actions";
import MyButton from "../../common/Button/MyButton";
import DropDownList from "../../common/DropDownList/DropDownList";
import RadioButtons from "../../common/Form/RadioButtons/RadioButtons";
import TextField from "../../common/Form/TextField/TextField";
import Loader from "../../ui/Loader/Loader";
import style from "./NewOrderPage.module.scss";

const NewOrderPage = () => {
  const { companies, isLoading, isLeadsLoading } = useUserData();
  const currentCompanies = companies && companies.map((c) => c.company);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentOrderId = nanoid();
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
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewOrder(order));
    dispatch(
      editLeadParameter({
        payload: true,
        id: order.companyId,
        parameter: "isRequested",
      })
    );
    history.push("orders-list");
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
      <div className={style.new_order_container}>
        <div className={style.new_order_container_item}>
          <h4>Выберите компанию:</h4>
          <DropDownList
            array={currentCompanies}
            sampleText="Выберите компанию"
            onChange={handleChooseCompany}
            name="companyId"
          />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Статус запроса:</h4>
          <DropDownList
            array={cargo.orderStatus}
            sampleText="Статус запроса"
            name="status"
            onChange={handleChangeDropDown}
          />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Вид перевозки:</h4>
          <DropDownList
            array={cargo.containersTypes}
            sampleText="Вид перевозки"
            onChange={handleChangeDropDown}
            name="containersTypes"
          />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Вид контракта:</h4>
          <DropDownList
            array={cargo.contractType}
            sampleText="Вид контракта"
            onChange={handleChangeDropDown}
            name="contractType"
          />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Инкотермс:</h4>
          <DropDownList
            array={cargo.incoterms}
            sampleText="Инкотермс"
            onChange={handleChangeDropDown}
            name="incoterms"
          />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Объём груза:</h4>
          {order.containersTypes === "Сборный груз" ||
          order.containersTypes === "Авиа" ? (
            <TextField name="volume" type="text" onChange={handleChange} />
          ) : (
            <DropDownList
              array={cargo.volume}
              sampleText="Объём груза"
              name="volume"
              onChange={handleChangeDropDown}
            />
          )}
        </div>{" "}
        <div className={style.new_order_container_item}>
          <h4>Как часто возит:</h4>
          <TextField name="howOften" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Вес груза:</h4>{" "}
          <TextField name="weight" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Характер груза:</h4>
          <TextField name="typeOfCargo" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Код ТН ВЭД:</h4>
          <TextField name="hsCode" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Температурный режим:</h4>
          <TextField name="temperature" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Класс опасности:</h4>
          <TextField name="hazard" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Вид упаковки:</h4>
          <TextField name="package" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Дополнительная информация:</h4>
          <TextField name="special" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Адрес забора груза:</h4>
          <TextField name="pickupAddress" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Место таможенного оформления:</h4>
          <TextField name="customs" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Адрес доставки груза:</h4>
          <TextField
            name="deliveryAddress"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Когда забирать:</h4>
          <TextField name="pickupDate" type="text" onChange={handleChange} />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Актуальность груза:</h4>
          <RadioButtons onChange={handleChangeRadio} name="isActual" />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Можно ли штабелировать:</h4>
          <RadioButtons onChange={handleChangeRadio} name="transshipment" />
        </div>
        <div className={style.new_order_container_item}>
          <h4>Дата запроса:</h4>
          <div className={style.new_order_container_item_frame}>
            {getDateFormat(Date.now(), ".")}
          </div>
        </div>
      </div>

      <MyButton text="Отправить запрос" onClick={handleSubmit} />
    </>
  ) : (
    <Loader />
  );
};

export default NewOrderPage;
