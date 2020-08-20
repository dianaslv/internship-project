import React from "react";
import AddDataModal from "../../../Commons/AddDataModal";
import AddJobForm from "../Forms/AddJobForm";

export default function AddJobModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add Job">
        <AddJobForm companyId={props.companyId} />
      </AddDataModal>
    </div>
  );
}
