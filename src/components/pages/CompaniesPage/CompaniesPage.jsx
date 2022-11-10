import React from "react";
import { Link } from "react-router-dom";
import LeadLayout from "../../../layouts/LeadLayout/LeadLayout";
import MyButton from "../../common/Button/MyButton";
import CompanyCard from "../../common/CompanyCard/CompanyCard";

const CompaniesPage = () => {
  const companies = null;
  return (
    <LeadLayout>
      {companies ? (
        companies.map((company) => {
          return <CompanyCard company={company} key={company.id} />;
        })
      ) : (
        <>
          <h3>Добавтье первую компанию</h3>
          <Link to="/new-company">
            <MyButton text="Добавить компанию" />
          </Link>
        </>
      )}
    </LeadLayout>
  );
};

export default CompaniesPage;
