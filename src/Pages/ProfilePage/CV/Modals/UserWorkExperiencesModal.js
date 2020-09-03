import React from "react";
import AddDataModal from "../../../../Commons/CommonComponents/AddDataModal";
import UserAdditionalInfosForm from "../../../../Commons/CommonComponents/Forms/UserAdditionalInfosForm";

export default function UserWorkExperiencesModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add User Work Experience">
        <UserAdditionalInfosForm handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
