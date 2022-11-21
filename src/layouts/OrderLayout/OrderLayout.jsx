import PropTypes from "prop-types";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSetArray } from "../../assets/utils/createSetArray";
import getDateFormat from "../../assets/utils/getDateFormat";
import DropDownList from "../../components/common/DropDownList/DropDownList";
import useUserData from "../../hooks/useUserData";
import { UserSlice } from "../../store/Users/reducer";
import style from "./OrderLayout.module.scss";

const OrderLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { orders, isOrdersLoading, isLoading } = useUserData();
  const [isOpenedFilter, setOpenedFilter] = useState({ isClosed: "" });
  const [actualDateFilter, setActualDateFilter] = useState({ date: "" });
  const [datesOfOrders, setDatesOfOrders] = useState(null);

  const handleChangeDropDownStatusIsOpen = (data) => {
    const getIsClosedField = () => {
      if (data.isClosed === "Все") {
        return "";
      } else {
        return data.isClosed !== "Открытые";
      }
    };
    setOpenedFilter((prevState) => ({
      ...prevState,
      isClosed: getIsClosedField(),
    }));
  };
  const handleChangeDropDownDate = (data) => {
    setActualDateFilter((prevState) => ({
      ...prevState,
      date:
        orders.find((o) => getDateFormat(o.date, ".") === data.date)?.date ||
        "",
    }));
  };

  useEffect(() => {
    // console.log(orders);
    // console.log(!isLoading);
    // console.log(!isOrdersLoading);
    orders &&
      !isOrdersLoading &&
      !isLoading &&
      setDatesOfOrders([
        "Все запросы",
        ...createSetArray(orders.map((o) => getDateFormat(o.date, "."))),
      ]);
    dispatch(UserSlice.actions.setOpenedStatus(isOpenedFilter.isClosed));
    dispatch(UserSlice.actions.setOrderDate(actualDateFilter.date));
  }, [isOrdersLoading, isLoading, isOpenedFilter, actualDateFilter]);

  return (
    <>
      <h1>Запросы</h1>
      <div className={style.order_layout_container}>
        <div className={style.order_layout_container_item}>
          <DropDownList
            sampleText="Сортировать (открытые/закрытые запросы)"
            array={["Все", "Открытые", "Закрытые"]}
            name="isClosed"
            onChange={handleChangeDropDownStatusIsOpen}
          />
        </div>

        <div className={style.order_layout_container_item}>
          <DropDownList
            sampleText="Сортировать по дате запроса"
            array={datesOfOrders}
            name="date"
            onChange={handleChangeDropDownDate}
          />
        </div>
      </div>
      {children}
    </>
  );
};

OrderLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default OrderLayout;
