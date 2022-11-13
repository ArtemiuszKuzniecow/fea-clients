import React, { useState } from "react";
import DropDownList from "../../components/common/DropDownList/DropDownList";
import style from "./LeadLayout.module.scss";
import cargo from "../../cargo.json";
import PropTypes from "prop-types";

const LeadLayout = ({ children }) => {
  const [status] = useState({ status: "Статус клиента" });
  const [dateToContactWithClient, setDateToContactWithClient] = useState([
    "01/02/2022",
    "04/05/2022",
    "03/03/2022",
  ]);

  return (
    <>
      <h1>Компании</h1>
      <div className={style.lead_layout_container}>
        <div className={style.lead_layout_container_item}>
          <DropDownList
            array={cargo.clientStatusArray}
            sampleText="Сортировать по статусу клиента"
          />
        </div>
        <div className={style.lead_layout_container_item}>
          <DropDownList
            array={dateToContactWithClient}
            sampleText="Сортировать по дате для связи с контактом"
          />
        </div>
      </div>
      <div>{children}</div>
    </>
  );
};

LeadLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default LeadLayout;
