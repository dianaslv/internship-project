import React from "react";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";
import NameInput from "../../../Commons/CommonComponents/Forms/NameInput";

export default function RequirementsModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add Job Requirement">
        <NameInput handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
