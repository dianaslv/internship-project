import React from "react";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";
import AddCompanyStepper from "./AddCompanyStepper";

export default function AddCompanyModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add Company">
        <AddCompanyStepper handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
