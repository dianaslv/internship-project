import React from "react";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";
import NameInput from "../../../Commons/CommonComponents/Forms/NameInput";

export default function BenefitsModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add Job Benefit">
        <NameInput handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
