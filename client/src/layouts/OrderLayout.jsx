import PropTypes from "prop-types";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSetArray } from "../utils/createSetArray";
import getDateFormat from "../utils/getDateFormat";
import DropDownList from "../components/common/DropDownList";
import useUserData from "../hooks/useUserData";
import { UserSlice } from "../store/Users/reducer";
import Headline from "../components/common/Headline";

const OrderLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { orders, isOrdersLoading, isLeadsLoading, isLoading } = useUserData();
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
    if (orders) {
      setDatesOfOrders([
        "Все",
        ...createSetArray(orders.map((o) => getDateFormat(o.date, "."))),
      ]);

      dispatch(UserSlice.actions.setOpenedStatus(isOpenedFilter.isClosed));
      dispatch(UserSlice.actions.setOrderDate(actualDateFilter.date));
    }
  }, [
    isOrdersLoading,
    isLoading,
    isOpenedFilter,
    isLeadsLoading,
    actualDateFilter,
  ]);

  return (
    <>
      <Headline>Запросы</Headline>
      <div className="container flex justify-end">
        <div>
          <DropDownList
            sampleText="Фильтровать (открытые/закрытые запросы)"
            array={["Все", "Открытые", "Закрытые"]}
            name="isClosed"
            onChange={handleChangeDropDownStatusIsOpen}
          />
        </div>

        <div>
          <DropDownList
            sampleText="Фильтровать по дате запроса"
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
