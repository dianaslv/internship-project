import React from "react";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";
import RequirementsForm from "../Forms/RequirementsForm";

export default function RequirementsModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add Job Requirement">
        <RequirementsForm
          handleSubmit={props.handleSubmit}
          jobId={props.jobId}
        />
      </AddDataModal>
    </div>
  );
}
