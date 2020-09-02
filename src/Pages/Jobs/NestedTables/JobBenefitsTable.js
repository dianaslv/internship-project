import React, { useEffect, useState } from "react";
import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddJobBenefit,
  DeleteJobBenefit,
  UpdateJobBenefit,
} from "../../../Apollo/Queries/JobQueries/JobBenefitsQueries";
import BenefitsModal from "../Modals/BenefitsModal";
import { GetJobBenefitsById } from "../../../Apollo/Queries/JobQueries/JobQueries";

export default function JobBenefitsTable(props) {
  const [getUpdatedJobBenefits, { data: updatedJobBenefits }] = useMutation(
    UpdateJobBenefit
  );
  const [deleteJobBenefits] = useMutation(DeleteJobBenefit);

  const { jobBenefits } = props;
  const [addJobBenefit] = useMutation(AddJobBenefit);

  const stopEditing = (i, editedData) => {
    console.log(editedData);
    let updatedBenefit = jobBenefits[i];
    console.log("submit", updatedBenefit.id, updatedBenefit.name, props.jobId);
    getUpdatedJobBenefits({
      variables: {
        id: updatedBenefit.id,
        name: updatedBenefit.name,
        jobId: props.jobId,
      },
    });
  };

  const handleRemove = (i) => {
    deleteJobBenefits({
      variables: { id: jobBenefits[i].id },
      refetchQueries: [
        {
          query: GetJobBenefitsById,
          variables: {
            id: props.jobId,
          },
        },
      ],
    });
  };

  const handleSubmit = (listOfBenefits) => {
    listOfBenefits.map((benefit, key) => {
      addJobBenefit({
        variables: {
          name: benefit.name,
          jobId: parseInt(props.jobId),
        },
        refetchQueries: [
          {
            query: GetJobBenefitsById,
            variables: {
              id: props.jobId,
            },
          },
        ],
      });
    });
  };

  return (
    <>
      {jobBenefits ? (
        <>
          {jobBenefits.length > 0 && (
            <CustomTable
              stopEditing={stopEditing}
              handleRemove={handleRemove}
              data={jobBenefits}
              header={[
                {
                  name: "Name",
                  prop: "name",
                },
              ]}
              title="Benefits table"
            />
          )}
          <BenefitsModal jobId={props.jobId} handleSubmit={handleSubmit} />
        </>
      ) : null}
    </>
  );
}
