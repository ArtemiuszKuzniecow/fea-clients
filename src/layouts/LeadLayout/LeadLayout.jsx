import React, { useState } from "react";
import DropDownList from "../../components/common/DropDownList/DropDownList";
import style from "./LeadLayout.module.scss";
import cargo from "../../cargo.json";
import PropTypes from "prop-types";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import getDateFormat from "../../assets/utils/getDateFormat";

const LeadLayout = ({ children }) => {
  const [status] = useState({ status: "Статус клиента" });
  const [dateToContactWithClient, setDateToContactWithClient] = useState(null);
  const { companies, isLeadsLoading } = useUserData();

  useEffect(() => {
    if (companies && !isLeadsLoading) {
      const datesSet = new Set(
        companies.map((c) => getDateFormat(c.status.date, "."))
      );
      setDateToContactWithClient(Array.from(datesSet));
    }
  }, [isLeadsLoading]);

  return (
    companies &&
    !isLeadsLoading && (
      <>
        <h1>Компании</h1>
        <div className={style.lead_layout_container}>
          <div className={style.lead_layout_container_item}>
            <DropDownList
              array={cargo.clientStatusArray}
              sampleText="Фильтровать по статусу клиента"
            />
          </div>
          <div className={style.lead_layout_container_item}>
            <DropDownList
              array={dateToContactWithClient}
              sampleText="Фильтровать по дате для связи с контактом "
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
