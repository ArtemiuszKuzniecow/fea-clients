import PropTypes from "prop-types";
import React from "react";
import {
  EmailImg,
  LocationImg,
  PersonImg,
  PhoneImg,
  WebsiteImg,
} from "../../assets/styles/svg";
import { Link } from "react-router-dom";

const CompanyContacts = ({ phone, email, website, manager, city }) => {
  return (
    <div className="p-3 mb-2 rounded-lg border-solid border-2 border-sky-300">
      <div className="flex flex-row items-center gap-2">
        <PersonImg />
        {manager}
      </div>
      <div className="flex flex-row items-center gap-2">
        <PhoneImg />
        {phone}
      </div>
      <div className="flex flex-row items-center gap-2">
        <LocationImg />
        {city}
      </div>
      <div className="flex flex-row items-center gap-2">
        <EmailImg />
        <a href={"mailto:" + email}>{email}</a>
      </div>
      <div className="flex flex-row items-center gap-2">
        <WebsiteImg />
        <Link to={website} target="_blank" rel="noreferrer">
          {website}
        </Link>
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
