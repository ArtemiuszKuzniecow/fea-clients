import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeadLayout from "../../../layouts/LeadLayout/LeadLayout";
import {
  getAllLeadsSelector,
  getLeadsLoadingStatus,
} from "../../../store/Leads/selectors";
import {
  getIsLoadingStatus,
  getUserDataSelector,
} from "../../../store/Users/selectors";
import MyButton from "../../common/Button/MyButton";
import CompanyCard from "../../common/CompanyCard/CompanyCard";
import Loader from "../../ui/Loader/Loader";

const CompaniesPage = () => {
  const isDataLoading = useSelector(getIsLoadingStatus());
  const isLeadLoading = useSelector(getLeadsLoadingStatus());
  const state = useSelector(getUserDataSelector());
  const companies = useSelector(getAllLeadsSelector(state?.userData?.leads));

  return (
    <LeadLayout>
      {!isDataLoading && !isLeadLoading ? (
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
