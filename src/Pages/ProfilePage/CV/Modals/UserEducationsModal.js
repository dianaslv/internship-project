import React from "react";
import AddDataModal from "../../../../Commons/CommonComponents/AddDataModal";
import UserAdditionalInfosForm from "../../../../Commons/CommonComponents/Forms/UserAdditionalInfosForm";

export default function UserEducationsModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add User Educations">
        <UserAdditionalInfosForm handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
