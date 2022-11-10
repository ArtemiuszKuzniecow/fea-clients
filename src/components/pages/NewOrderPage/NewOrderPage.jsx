import React, { useState } from "react";
import {
  containersTypes,
  contractType,
  incoterms,
  orderPoints,
  orderPointsLabel,
} from "../../../assets/js/variables";
import MyButton from "../../common/Button/MyButton";
import DropDownList from "../../common/DropDownList/DropDownList";
import TextField from "../../common/Form/TextField/TextField";
import style from "./NewOrderPage.module.scss";

const NewOrderPage = () => {
  const [order, setOrder] = useState({
    incoterms: "Инкотермс",
    containersTypes: "Тип перевозки (контейнерная, авто, сборный, авиа)",
    contractType: "Тип контракта",
    transshipment: "",
    hazard: "",
    temperature: "",
    pickupAddress: "",
    typeOfCargo: "",
    hsCode: "",
    weight: "",
    volume: "",
    package: "",
    special: "",
    customs: "",
    deliveryAddress: "",
    pickupDate: "",
    howOften: "",
    addition: "",
  });

  const setData = (data, name) => {
    setOrder((prevState) => {
      return { ...order, [name]: data };
    });
  };

  const [disabled, setDisabled] = useState(
    orderPoints.map((point) => {
      return false;
    })
  );

  const [buttonText, setButtonText] = useState(
    orderPoints.map((point) => {
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
    <>
      <div className={style.new_order_container}>
        <div className={style.new_order_container_item}>
          <DropDownList array={incoterms} sampleText={order.incoterms} />
        </div>
        <div className={style.new_order_container_item}>
          <DropDownList
            array={containersTypes}
            sampleText={order.containersTypes}
          />
        </div>
        <div className={style.new_order_container_item}>
          <DropDownList array={contractType} sampleText={order.contractType} />
        </div>
        <div className={style.new_order_container_item}>
          <p>Можно ли штабелировать груз - радиокнопка</p>
        </div>
        <div className={style.new_order_container_item}>
          <p>
            Опасный груз или нет - радиокнопка (если да - появляется поле
            строка)
          </p>
        </div>
        <div className={style.new_order_container_item}>
          <p>
            Температурный режим груза - радиокнопка (если да - появляется поле
            строка)
          </p>
        </div>
        {orderPoints.map((orderdPoint, index) => {
          return (
            <div className={style.new_order_container_item} key={orderdPoint}>
              <label htmlFor={orderdPoint}>{orderPointsLabel[index]}</label>
              <TextField
                name={orderdPoint}
                type="text"
                isButton={true}
                buttonText={buttonText[index]}
                disabled={disabled[index]}
                onClick={() => handleDisabled(index)}
                onChange={(e) => setData(e.target.value, orderdPoint)}
              />
            </div>
          );
        })}
      </div>
      <MyButton text="Отправить запрос" onClick={handleSubmit} />
    </>
  );
};

export default NewOrderPage;
