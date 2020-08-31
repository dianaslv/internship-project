import React from "react";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";
import BenefitsForm from "../Forms/BenefitsForm";

export default function BenefitsModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add Job Benefit">
        <BenefitsForm handleSubmit={props.handleSubmit} jobId={props.jobId} />
      </AddDataModal>
    </div>
  );
}
