import React, { useState } from "react";
import DropDownList from "../../components/common/DropDownList/DropDownList";
import style from "./LeadLayout.module.scss";
import cargo from "../../cargo.json";
import PropTypes from "prop-types";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import getDateFormat, {
  getOppositeDateFormat,
} from "../../assets/utils/getDateFormat";
import { useDispatch } from "react-redux";
import { UserSlice } from "../../store/Users/reducer";

const LeadLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { companies, isLeadsLoading } = useUserData();
  const [dateToContactWithClient, setDateToContactWithClient] = useState(null);
  const [dateFilter, setDateFilter] = useState({ date: "" });
  const [statusFilter, setStatusFilter] = useState({ status: "" });
  useEffect(() => {
    if (companies && !isLeadsLoading) {
      const datesSet = new Set(
        companies.map((c) => getDateFormat(c.status.date, "."))
      );
      setDateToContactWithClient(["Все компании", ...Array.from(datesSet)]);
    }
  }, [isLeadsLoading]);

  const handleChangeDropDownStatus = (data) => {
    setStatusFilter((prevState) => ({ ...prevState, ...data }));
  };
  const handleChangeDropDownDate = (data) => {
    setDateFilter((prevState) => ({
      ...prevState,
      date: getOppositeDateFormat(data.date).getTime(),
    }));
  };

  useEffect(() => {
    dispatch(UserSlice.actions.setClientsStatus(statusFilter.status));
    dispatch(UserSlice.actions.setContactDate(dateFilter.date));
  }, [dateFilter, statusFilter]);

  const changeRedux = (data) => {
    dispatch(UserSlice.actions.setClientsStatus(data));
  };

  return (
    companies &&
    !isLeadsLoading && (
      <>
        <h1>Компании</h1>
        <div className={style.lead_layout_container}>
          <div className={style.lead_layout_container_item}>
            <DropDownList
              array={["Все компании", ...cargo.clientStatusArray]}
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
        <button onClick={() => changeRedux("test")}>test</button>
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
