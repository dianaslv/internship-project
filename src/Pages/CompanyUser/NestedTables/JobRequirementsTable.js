import React, { useState } from "react";
import CustomTable from "../../../Commons/CommonComponents/CustomTable";
import { useMutation } from "@apollo/client";
import {
  DeleteJobRequirement,
  UpdateJobRequirement,
} from "../../../Apollo/Queries/JobQueries/JobRequirementsQueries";
import RequirementsModal from "../Modals/RequirementsModal";

export default function JobRequirementsTable(props) {
  const [index, setIndex] = useState(-1);
  const [
    getUpdatedJobRequirements,
    { data: updatedJobRequirements },
  ] = useMutation(UpdateJobRequirement);
  const [deleteJobRequirements, { data: deletedJobRequirements }] = useMutation(
    DeleteJobRequirement
  );

  const { requirements } = props;

  console.log("Requirement in table", requirements);
  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const stopEditing = (i) => {
    let updatedJob = requirements[i];
    console.log("submit", updatedJob.id, updatedJob.name, props.jobId);

    getUpdatedJobRequirements({
      variables: {
        id: updatedJob.id,
        name: updatedJob.name,
        jobId: props.jobId,
      },
    }).then((r) => {
      console.log(r);
      console.log(updatedJobRequirements, updatedJob);
      setIndex(-1);
    });
  };

  const handleChange = (options) => {
    props.handleUpdateJobRequirement(
      options.value,
      options.name,
      props.positionInJobRequirementsTable,
      options.index
    );
  };

  const handleRemove = (i) => {
    deleteJobRequirements({
      variables: { id: requirements[i].id },
    }).then((r) => console.log(r));
  };

  return requirements ? (
    <>
      <CustomTable
        startEditing={startEditing}
        editIdx={index}
        stopEditing={stopEditing}
        handleChange={handleChange}
        handleRemove={handleRemove}
        data={requirements}
        header={[
          {
            name: "Id",
            prop: "id",
          },
          {
            name: "Name",
            prop: "name",
          },
        ]}
        title="Requirements table"
      />
      <RequirementsModal jobId={props.jobId} />
    </>
  ) : null;
}
