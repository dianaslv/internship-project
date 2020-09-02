import React from "react";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";
import AddJobForm from "../Forms/AddJobForm";

export default function AddJobModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add Job">
        <AddJobForm
          companyId={props.companyId}
          handleSubmit={props.handleSubmit}
        />
      </AddDataModal>
    </div>
  );
}
