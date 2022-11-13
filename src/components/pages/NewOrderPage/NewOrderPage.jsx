import { nanoid } from "nanoid";
import React, { useState } from "react";
import getDateFormat from "../../../assets/utils/getDateFormat";
import cargo from "../../../cargo.json";
import useUserData from "../../../hooks/useUserData";
import MyButton from "../../common/Button/MyButton";
import DropDownList from "../../common/DropDownList/DropDownList";
import RadioButtons from "../../common/Form/RadioButtons/RadioButtons";
import TextField from "../../common/Form/TextField/TextField";
import style from "./NewOrderPage.module.scss";

const NewOrderPage = () => {
  const { companies } = useUserData();
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
    orderId: nanoid(),
    package: "",
    pickupAddress: "",
    pickupDate: "",
    price: "",
    special: "",
    status: "",
    temperature: "",
    transshipment: "",
    typeOfCargo: "",
    volume: "",
    weight: "",
  });

  const setData = (data, name) => {
    setOrder((prevState) => {
      return { ...order, [name]: data };
    });
  };

  const [disabled, setDisabled] = useState(
    cargo.orderPoints.map((point) => {
      return false;
    })
  );

  const [buttonText, setButtonText] = useState(
    cargo.orderPoints.map((point) => {
      return "OK";
    })
  );

  const handleDisabled = (index) => {
    setDisabled((prevState) => {
      return prevState.map((state, i) => {
        if (i === index) {
          return !state;
        } else {
          return state;
        }
      });
    });
    setButtonText((prevState) => {
      return prevState.map((state, i) => {
        if (i === index && state === "OK") {
          return "Редактировать";
        } else if (i === index && state === "Редактировать") {
          return "OK";
        } else {
          return state;
        }
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(order);
  };

  return (
    companies && (
      <>
        <div
          className={style.new_order_container_item}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <DropDownList
            array={companies.map((c) => c.company)}
            sampleText="Выберите компанию"
          />
        </div>
        <div className={style.new_order_container}>
          <div className={style.new_order_container_item}>
            <h4>Вид перевозки:</h4>
            <DropDownList
              array={cargo.containersTypes}
              sampleText="Вид перевозки"
            />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Вид контракта:</h4>
            <DropDownList
              array={cargo.contractType}
              sampleText="Вид контракта"
            />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Статус запроса:</h4>
            <DropDownList
              array={cargo.orderStatus}
              sampleText="Статус запроса"
            />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Инкотермс:</h4>
            <DropDownList array={cargo.incoterms} sampleText="Инкотермс" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Объём груза:</h4>
            {order.containersTypes === "Сборный груз" ||
            order.containersTypes === "Авиа" ? (
              <TextField name="volume" type="text" />
            ) : (
              <DropDownList array={cargo.volume} sampleText="Объём груза" />
            )}
          </div>{" "}
          <div className={style.new_order_container_item}>
            <h4>Как часто возит:</h4>
            <TextField name="howOften" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Ставка:</h4>
            <TextField name="price" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Вес груза:</h4> <TextField name="weight" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Характер груза:</h4>
            <TextField name="typeOfCargo" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Код ТН ВЭД:</h4>
            <TextField name="hsCode" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Температурный режим:</h4>
            <TextField name="temperature" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Класс опасности:</h4>
            <TextField name="hazard" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Вид упаковки:</h4>
            <TextField name="package" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Дополнительная информация по запросу:</h4>
            <TextField name="special" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Адрес забора груза:</h4>
            <TextField name="pickupAddress" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Место таможенного оформления:</h4>
            <TextField name="customs" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Адрес доставки груза:</h4>
            <TextField name="deliveryAddress" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Когда забирать:</h4>
            <TextField name="pickupDate" type="text" />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Актуальность груза:</h4>
            <RadioButtons />
          </div>
          <div className={style.new_order_container_item}>
            <h4>Можно ли штабелировать:</h4>
            <RadioButtons />
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
    )
  );
};

export default NewOrderPage;
