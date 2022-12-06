import PropTypes from "prop-types";
import React from "react";

const CompanyContacts = ({ phone, email, website, manager, city }) => {
  return (
    <div>
      <div>{manager}</div>
      <div>{phone}</div>
      <div>{city}</div>
      <div>
        <a href={"mailto:" + email}>{email}</a>
      </div>
      <div>
        <a href={website} target="_blank" rel="noreferrer">
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
