import React from "react";
import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation } from "@apollo/client";
import {
  AddJobBenefit,
  DeleteJobBenefit,
  UpdateJobBenefit,
} from "../../../Apollo/Queries/JobQueries/JobBenefitsQueries";
import BenefitsModal from "../Modals/BenefitsModal";
import { Jobs } from "../../../Apollo/Queries/JobQueries/JobQueries";

export default function JobBenefitsTable(props) {
  const [updateJobBenefit] = useMutation(UpdateJobBenefit);
  const [deleteJobBenefits] = useMutation(DeleteJobBenefit);
  const { jobBenefits } = props;
  const [addJobBenefit] = useMutation(AddJobBenefit);

  const stopEditing = (i, editedData) => {
    console.log(editedData);
    let updatedBenefit = jobBenefits[i];
    console.log("submit", updatedBenefit.id, updatedBenefit.name, props.jobId);
    updateJobBenefit({
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
          query: Jobs,
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
            query: Jobs,
          },
        ],
      });
    });
  };

  return (
    <>
      {jobBenefits ? (
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
      ) : null}
      <BenefitsModal jobId={props.jobId} handleSubmit={handleSubmit} />
    </>
  );
}
