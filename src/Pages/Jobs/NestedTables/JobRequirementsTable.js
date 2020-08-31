import React, { useEffect, useState } from "react";
import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddJobRequirement,
  DeleteJobRequirement,
  UpdateJobRequirement,
} from "../../../Apollo/Queries/JobQueries/JobRequirementsQueries";
import RequirementsModal from "../Modals/RequirementsModal";
import { GetJobRequirementsById } from "../../../Apollo/Queries/JobQueries/JobQueries";

export default function JobRequirementsTable(props) {
  const [index, setIndex] = useState(-1);
  const [updateJobRequirements, { data: updatedJobRequirements }] = useMutation(
    UpdateJobRequirement
  );
  const [deleteJobRequirements] = useMutation(DeleteJobRequirement);
  const { data, loading } = useQuery(GetJobRequirementsById, {
    variables: { id: props.jobId },
  });
  const [jobRequirements, setJobRequirements] = useState([]);
  const [addJobRequirement] = useMutation(AddJobRequirement);

  useEffect(() => {
    if (data) {
      let updatedJobRequirements = [];
      data.job.jobRequirements.map((requirement, key) =>
        updatedJobRequirements.push({
          id: requirement.id,
          name: requirement.name,
        })
      );
      setJobRequirements(updatedJobRequirements);
      console.log(updatedJobRequirements, setJobRequirements);
    }
  }, [data]);

  if (loading) return null;

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const stopEditing = (i) => {
    let updatedJob = jobRequirements[i];
    console.log("submit", updatedJob.id, updatedJob.name, props.jobId);

    updateJobRequirements({
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
    const updatedJobRequirements = [...jobRequirements];
    updatedJobRequirements[options.index][options.name] = options.value;
    setJobRequirements(updatedJobRequirements);
  };

  const handleRemove = (i) => {
    deleteJobRequirements({
      variables: { id: jobRequirements[i].id },
      refetchQueries: [
        {
          query: GetJobRequirementsById,
          variables: {
            id: props.jobId,
          },
        },
      ],
    }).then((r) => console.log(r));
  };

  const handleSubmit = (listOfRequirements) => {
    listOfRequirements.map((requirement, key) => {
      if (requirement.name !== "")
        addJobRequirement({
          variables: {
            name: requirement.name,
            jobId: parseInt(props.jobId),
          },
          refetchQueries: [
            {
              query: GetJobRequirementsById,
              variables: {
                id: props.jobId,
              },
            },
          ],
        }).then((r) => console.log(r));
    });
  };

  return (
    jobRequirements && (
      <>
        {jobRequirements.length > 0 && (
          <CustomTable
            startEditing={startEditing}
            editIdx={index}
            stopEditing={stopEditing}
            handleChange={handleChange}
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
        )}
        <RequirementsModal jobId={props.jobId} handleSubmit={handleSubmit} />
      </>
    )
  );
}
