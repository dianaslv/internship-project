import React, { useEffect, useState } from "react";
import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddJobRequirement,
  DeleteJobRequirement,
  UpdateJobRequirement,
} from "../../../Apollo/Queries/JobQueries/JobRequirementsQueries";
import RequirementsModal from "../Modals/RequirementsModal";
import { Jobs } from "../../../Apollo/Queries/JobQueries/JobQueries";

export default function JobRequirementsTable({ jobId, jobRequirements }) {
  const [updateJobRequirements] = useMutation(UpdateJobRequirement);
  const [deleteJobRequirements] = useMutation(DeleteJobRequirement);
  const [addJobRequirement] = useMutation(AddJobRequirement);

  const stopEditing = (i, editData) => {
    console.log(editData);
    updateJobRequirements({
      variables: {
        id: editData.id,
        name: editData.name,
        jobId: jobId,
      },
    });
  };

  const handleRemove = (i) => {
    deleteJobRequirements({
      variables: { id: jobRequirements[i].id },
      refetchQueries: [
        {
          query: Jobs,
        },
      ],
    }).then((r) => console.log(r));
  };

  const handleSubmit = (listOfRequirements) => {
    listOfRequirements.map((requirement, key) => {
      addJobRequirement({
        variables: {
          name: requirement.name,
          jobId: parseInt(jobId),
        },
        refetchQueries: [
          {
            query: Jobs,
          },
        ],
      });
    });
  };

  return (
    <>
      {jobRequirements ? (
        <CustomTable
          stopEditing={stopEditing}
          handleRemove={handleRemove}
          data={jobRequirements}
          header={[
            {
              name: "Name",
              prop: "name",
            },
          ]}
          title="Requirements table"
        />
      ) : null}
      <RequirementsModal jobId={jobId} handleSubmit={handleSubmit} />
    </>
  );
}
