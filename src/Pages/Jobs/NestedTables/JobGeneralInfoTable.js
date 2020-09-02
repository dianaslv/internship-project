import React from "react";
import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation } from "@apollo/client";
import { UpdateJob } from "../../../Apollo/Queries/JobQueries/JobQueries";

export default function JobGeneralInfoTable({ jobGeneralInfo }) {
  const [getUpdatedJobs] = useMutation(UpdateJob);

  const stopEditing = (i, editedData) => {
    const jobAvailability = editedData.isAvailable === "Available";
    getUpdatedJobs({
      variables: {
        id: editedData.id,
        name: editedData.name,
        description: editedData.description,
        isAvailable: jobAvailability,
      },
    });
  };

  return jobGeneralInfo ? (
    <CustomTable
      stopEditing={stopEditing}
      data={[jobGeneralInfo]}
      header={[
        {
          name: "Name",
          prop: "name",
        },
        {
          name: "description",
          prop: "description",
        },
        {
          name: "isAvailable",
          prop: "isAvailable",
          specialFormatForDisplaying: "jobAvailability",
        },
      ]}
      title="Users table"
      disableDelete={true}
    />
  ) : null;
}
