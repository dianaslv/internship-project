import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AddContactInfo } from "../../../Apollo/Queries/UserQueries/UserQueries";
import {
  AddCompany,
  Companies,
  DeleteCompany,
} from "../../../Apollo/Queries/CompanyQueries/CompanyQueries";
import CompanyGeneralInfoTable from "./CompanyGeneralInfoTable";
import CompanyContactInfo from "./CompanyContactInfo";
import AddCompanyModal from "./AddCompanyModal";

export default function CompaniesTable() {
  const [addCompany] = useMutation(AddCompany);
  const { data: companiesData, loading } = useQuery(Companies);
  const [addContactInfo] = useMutation(AddContactInfo);
  console.log(companiesData);

  if (loading) return null;

  const handleSubmit = (company) => {
    addContactInfo({
      variables: {
        email: company.email,
        phone: company.phone,
        city: company.city,
        countryId: parseInt(company.countryId),
        website: company.website,
        avatarUrl: company.avatarUrl,
        about: company.about,
      },
    }).then((r1) => {
      addCompany({
        variables: {
          name: company.name,
          userId: parseInt(company.userId),
          contactInfoId: r1.data.createContactInfo.id,
        },
        refetchQueries: [
          {
            query: Companies,
          },
        ],
      }).then((r) => console.log(r));
    });
  };

  return companiesData && companiesData.companies ? (
    <>
      <AddCompanyModal handleSubmit={handleSubmit} />
      {companiesData.companies.map((company, key) => {
        return (
          <>
            <CompanyGeneralInfoTable company={company} />
            <CompanyContactInfo contactInfo={company.contactInfo} />
          </>
        );
      })}
    </>
  ) : null;
}