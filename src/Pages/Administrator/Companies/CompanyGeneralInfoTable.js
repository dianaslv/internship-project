import React from "react";
import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation } from "@apollo/client";
import {
  Companies,
  DeleteCompany,
  UpdateCompany,
} from "../../../Apollo/Queries/CompanyQueries/CompanyQueries";

export default function CompanyGeneralInfoTable({ company }) {
  const [updateCompany] = useMutation(UpdateCompany);
  const [deleteCompany] = useMutation(DeleteCompany);

  const stopEditing = (i, editedData) => {
    console.log(editedData);
    updateCompany({
      variables: {
        id: editedData.id,
        name: editedData.name,
        userId: editedData.user.id,
      },
      refetchQueries: [
        {
          query: Companies,
        },
      ],
    });
  };

  const handleRemove = (i) => {
    deleteCompany({
      variables: {
        id: company.id,
      },
      refetchQueries: [
        {
          query: Companies,
        },
      ],
    });
  };

  console.log(company);
  return (
    <>
      {company ? (
        <CustomTable
          stopEditing={stopEditing}
          data={[company]}
          handleRemove={handleRemove}
          header={[
            {
              name: "Name",
              prop: "name",
            },
            {
              name: "User",
              prop: "user.username",
              componentForEditing: "UserSelector",
            },
          ]}
          title="Company General Info"
        />
      ) : null}
    </>
  );
}
