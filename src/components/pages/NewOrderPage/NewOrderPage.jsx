import { nanoid } from "nanoid";
import React, { useState } from "react";
import cargo from "../../../cargo.json";
import MyButton from "../../common/Button/MyButton";
import DropDownList from "../../common/DropDownList/DropDownList";
import RadioButtons from "../../common/Form/RadioButtons/RadioButtons";
import TextField from "../../common/Form/TextField/TextField";
import style from "./NewOrderPage.module.scss";

const NewOrderPage = () => {
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
    <>
      <div className={style.new_order_container}>
        <div className={style.new_order_container_item}>
          <DropDownList array={cargo.incoterms} sampleText={order.incoterms} />
        </div>
        <div className={style.new_order_container_item}>
          <DropDownList
            array={cargo.containersTypes}
            sampleText={order.containersTypes}
          />
        </div>
        <div className={style.new_order_container_item}>
          <DropDownList
            array={cargo.contractType}
            sampleText={order.contractType}
          />
        </div>
        <div className={style.new_order_container_item}>
          <p>Можно ли штабелировать груз - радиокнопка</p>
          <RadioButtons name="transshipment" />
        </div>
        <div className={style.new_order_container_item}>
          <p>Опасный груз или нет</p>
          <RadioButtons name="hazard" />
        </div>
        <div className={style.new_order_container_item}>
          <p>Температурный режим груза</p>
          <RadioButtons name="temp" />
        </div>
        {/* <div className={style.new_order_container_item} key={orderdPoint}>
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
            </div> */}
      </div>
      <MyButton text="Отправить запрос" onClick={handleSubmit} />
    </>
  );
};

export default NewOrderPage;
