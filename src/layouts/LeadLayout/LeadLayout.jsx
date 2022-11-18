import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getDateFormat from "../../assets/utils/getDateFormat";
import DropDownList from "../../components/common/DropDownList/DropDownList";
import useUserData from "../../hooks/useUserData";
import { UserSlice } from "../../store/Users/reducer";
import style from "./LeadLayout.module.scss";

const LeadLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { companies, isLeadsLoading, isLoading, clientStatus, contactDate } =
    useUserData();
  const [statusArray, setStatusArray] = useState(null);
  const [dateToContactWithClient, setDateToContactWithClient] = useState(null);
  const [dateFilter, setDateFilter] = useState({ date: "" });
  const [statusFilter, setStatusFilter] = useState({ status: "" });
  const [filtredCompaniesByStatus, setFiltredCompaniesByStatus] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [statusArr, setStatusArr] = useState([]);

  console.log(clientStatus, contactDate);

  const createSetArray = (arr) => {
    return Array.from(new Set(arr));
  };

  useEffect(() => {
    if (companies && !isLeadsLoading) {
      if (
        (clientStatus.length > 1 || clientStatus !== "Все компании") &&
        contactDate
      ) {
        setFiltredCompaniesByStatus(companies);
      }
      if (
        clientStatus.length > 1 &&
        clientStatus !== "Все компании" &&
        !contactDate
      ) {
        setFiltredCompaniesByStatus((prevState) =>
          prevState.filter((c) => c.status.value)
        );
      }
      if (
        (contactDate && clientStatus.length < 1) ||
        clientStatus === "Все компании"
      ) {
        setFiltredCompaniesByStatus((prevState) =>
          prevState.filter((c) => c.status.date)
        );
      }
      if (filtredCompaniesByStatus) {
        setDateArr(
          filtredCompaniesByStatus.map((c) => getDateFormat(c.status.date, "."))
        );
        setStatusArr(filtredCompaniesByStatus.map((c) => c.status.value));
        console.log(dateArr, statusArr);
        setDateToContactWithClient([
          "Все компании",
          ...createSetArray(dateArr),
        ]);
        setStatusArray(["Все компании", ...createSetArray(statusArr)]);
      }
    }
  }, [isLeadsLoading, isLoading]);

  const handleChangeDropDownStatus = (data) => {
    setStatusFilter((prevState) => ({ ...prevState, ...data }));
  };
  const handleChangeDropDownDate = (data) => {
    setDateFilter((prevState) => ({
      ...prevState,
      date:
        companies.find((c) => getDateFormat(c.status.date, ".") === data.date)
          ?.status?.date || "",
    }));
  };

  useEffect(() => {
    dispatch(UserSlice.actions.setClientsStatus(statusFilter.status));
    dispatch(UserSlice.actions.setContactDate(dateFilter.date));
  }, [dateFilter, statusFilter]);

  return (
    companies &&
    !isLeadsLoading && (
      <>
        <h1>Компании</h1>
        <div className={style.lead_layout_container}>
          <div className={style.lead_layout_container_item}>
            <DropDownList
              array={statusArray}
              sampleText="Фильтровать по статусу клиента"
              name="status"
              onChange={handleChangeDropDownStatus}
            />
          </div>
          <div className={style.lead_layout_container_item}>
            <DropDownList
              array={dateToContactWithClient}
              sampleText="Фильтровать по дате для связи с контактом "
              name="date"
              onChange={handleChangeDropDownDate}
            />
          </div>
        </div>
        <div>{children}</div>
      </>
    )
  );
};

LeadLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default LeadLayout;
