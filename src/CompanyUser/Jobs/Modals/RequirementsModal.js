import React from "react";
import AddDataModal from "../../../Commons/AddDataModal";
import RequirementsForm from "../Forms/RequirementsForm";
import { useMutation } from "@apollo/client";
import { AddJobRequirement } from "../../../Apollo/Queries/JobQueries/JobRequirementsQueries";

export default function RequirementsModal(props) {
  const [addJobRequirement, { data: addedJobRequirement }] = useMutation(
    AddJobRequirement
  );

  console.log(props.jobId);

  const handleSubmit = (listOfRequirements) => {
    listOfRequirements.map((requirement, key) => {
      if (requirement.name !== "")
        addJobRequirement({
          variables: {
            name: requirement.name,
            jobId: parseInt(props.jobId),
          },
        }).then((r) => console.log(r));
    });
  };

  return (
    <div>
      <AddDataModal buttonText="Add Job Requirement">
        <RequirementsForm handleSubmit={handleSubmit} jobId={props.jobId} />
      </AddDataModal>
    </div>
  );
}
