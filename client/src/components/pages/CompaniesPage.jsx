import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import LeadLayout from "../../layouts/LeadLayout";
import CompanyCard from "../common/CompanyCard";
import Headline from "../common/Headline";
import Loader from "../ui/Loader/Loader";
import MyButton from "../common/MyButton";

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
          currentCompanies
            .map((company) => company._id)
            .map((c) => {
              return <CompanyCard companyId={c} key={c} />;
            })
        ) : (
          <>
            <Headline>Добавтье первую компанию</Headline>
            <Link to="/new-company">
              <MyButton>Добавить компанию</MyButton>
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
