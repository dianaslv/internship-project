import React, { useEffect, useState } from "react";
import CustomTable from "../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation, useQuery } from "@apollo/client";
import {
  CompanyGeneralInfo,
  UpdateCompany,
} from "../../Apollo/Queries/CompanyQueries/CompanyQueries";

export default function CompanyGeneralInfoTable(props) {
  const { companyId, position } = props;
  const [company, setCompany] = useState();
  const [index, setIndex] = useState(-1);
  const [updateCompany] = useMutation(UpdateCompany);
  const { data: companyData, loading } = useQuery(CompanyGeneralInfo, {
    variables: { id: companyId },
  });
  console.log(companyId, position);

  useEffect(() => {
    if (companyData && companyData.company) {
      console.log(companyData);
      transformData(companyData.company);
    }
  }, [companyData]);

  if (loading) return null;

  const transformData = (newData) => {
    let newCompany = {};
    newCompany.id = newData["id"];
    newCompany.name = newData["name"];
    newCompany.userId = newData["user"]["id"];
    newCompany.userName = newData["user"]["username"];
    setCompany(newCompany);
    console.log(newCompany);
  };

  const startEditing = (i) => {
    setIndex(i);
  };

  const stopEditing = (i) => {
    console.log(company);
    updateCompany({
      variables: {
        id: companyId,
        name: company.name,
        userId: parseInt(company.userId),
      },
      refetchQueries: [
        {
          query: CompanyGeneralInfo,
          variables: {
            id: companyId,
          },
        },
      ],
    }).then((r) => {
      setIndex(-1);
    });
  };

  const handleChange = (options) => {
    console.log(options);
    const updatedCompany = { ...company };
    updatedCompany[options.name] = options.value;
    if (options.options) {
      const selectedIndex = options.options.selectedIndex;
      updatedCompany["userId"] = options.options[selectedIndex].getAttribute(
        "data-key"
      );
    }
    console.log(updatedCompany);
    setCompany(updatedCompany);
  };

  const handleRemove = (i) => {
    props.handleRemove(companyId);
  };

  return (
    <>
      {companyData && companyData.company && company ? (
        <CustomTable
          startEditing={startEditing}
          editIdx={index}
          stopEditing={stopEditing}
          handleChange={handleChange}
          data={[company]}
          handleRemove={handleRemove}
          header={[
            {
              name: "Name",
              prop: "name",
            },
            {
              name: "User",
              prop: "userName",
              componentForEditing: "UserSelector",
            },
          ]}
          title="Company General Info"
        />
      ) : null}
    </>
  );
}
