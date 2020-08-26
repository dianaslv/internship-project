import React from "react";
import RegisterUserForm from "../Commons/RegisterUserForm";
import AddDataModal from "../Commons/AddDataModal";

export default function AddUserModal(props) {
  const handleSubmit = (user) => {
    props.handleSubmitData(user);
  };

  return (
    <div>
      <AddDataModal buttonText="Add User">
        <RegisterUserForm handleSubmitData={handleSubmit} />
      </AddDataModal>
    </div>
  );
}
