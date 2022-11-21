import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";
import LeadLayout from "../../../layouts/LeadLayout/LeadLayout";
import MyButton from "../../common/Button/MyButton";
import CompanyCard from "../../common/CompanyCard/CompanyCard";
import Loader from "../../ui/Loader/Loader";

const CompaniesPage = () => {
  const { isLoading, isLeadsLoading, companies, clientStatus, contactDate } =
    useUserData();
  const [currentCompanies, setCurrentCompanies] = useState([]);

  useEffect(() => {
    if (!isLoading && !isLeadsLoading) {
      if (
        (clientStatus.length < 1 || clientStatus === "Все компании") &&
        !contactDate
      ) {
        setCurrentCompanies(companies);
      } else if (
        (clientStatus.length > 1 || clientStatus !== "Все компании") &&
        !contactDate
      ) {
        setCurrentCompanies(
          companies.filter((c) => c.status.value === clientStatus)
        );
      } else if (
        (clientStatus.length < 1 || clientStatus === "Все компании") &&
        contactDate
      ) {
        setCurrentCompanies(
          companies.filter((c) => c.status.date === contactDate)
        );
      } else if (
        (clientStatus.length > 1 || clientStatus !== "Все компании") &&
        contactDate
      ) {
        setCurrentCompanies(
          companies.filter(
            (c) =>
              c.status.date === contactDate && c.status.value === clientStatus
          )
        );
      }
    }
  }, [clientStatus, contactDate, isLoading, isLeadsLoading]);

  return (
    <LeadLayout>
      {!isLoading && !isLeadsLoading ? (
        currentCompanies && currentCompanies.length > 0 ? (
          currentCompanies.map((company) => {
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
