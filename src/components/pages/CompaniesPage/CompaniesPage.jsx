import React from "react";
import { Link } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";
import LeadLayout from "../../../layouts/LeadLayout/LeadLayout";
import MyButton from "../../common/Button/MyButton";
import CompanyCard from "../../common/CompanyCard/CompanyCard";
import Loader from "../../ui/Loader/Loader";

const CompaniesPage = () => {
  const { isLoading, isLeadsLoading, companies } = useUserData();

  return (
    <LeadLayout>
      {!isLoading && !isLeadsLoading ? (
        companies ? (
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
        )
      ) : (
        <Loader />
      )}
    </LeadLayout>
  );
};

export default CompaniesPage;
