import React from "react";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";
import BenefitsForm from "../Forms/BenefitsForm";
import { useMutation } from "@apollo/client";
import { AddJobBenefit } from "../../../Apollo/Queries/JobQueries/JobBenefitsQueries";

export default function BenefitsModal(props) {
  const [addJobBenefit, { data: addedJobBenefit }] = useMutation(AddJobBenefit);

  const handleSubmit = (listOfBenefits) => {
    listOfBenefits.map((benefit, key) => {
      if (benefit.name !== "")
        addJobBenefit({
          variables: {
            name: benefit.name,
            jobId: parseInt(props.jobId),
          },
        }).then((r) => console.log(r));
    });
  };
  return (
    <div>
      <AddDataModal buttonText="Add Job Benefit">
        <BenefitsForm handleSubmit={handleSubmit} jobId={props.jobId} />
      </AddDataModal>
    </div>
  );
}