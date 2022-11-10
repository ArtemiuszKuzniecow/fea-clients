import React from "react";
import style from "./CompanyContacts.module.scss";
import PropTypes from "prop-types";

const CompanyContacts = ({ phone, email, website, manager, city }) => {
  return (
    <div className={style.company_contacts}>
      <div>{manager}</div>
      <div>{phone}</div>
      <div>{city}</div>
      <div>
        <a href={"mailto:" + email} className={style.company_contacts_link}>
          {email}
        </a>
      </div>
      <div>
        <a href={website} className={style.company_contacts_link}>
          {website}
        </a>
      </div>
    </div>
  );
};

CompanyContacts.propTypes = {
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  manager: PropTypes.string,
  city: PropTypes.string,
};

export default CompanyContacts;
