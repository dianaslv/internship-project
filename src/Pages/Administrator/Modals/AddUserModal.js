import React from "react";
import RegisterUserForm from "../../../Commons/CommonComponents/RegisterUserForm";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";

export default function AddUserModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add User">
        <RegisterUserForm handleSubmitData={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
