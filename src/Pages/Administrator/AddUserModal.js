import React from "react";
import RegisterUserForm from "../../Commons/CommonComponents/RegisterUserForm";
import AddDataModal from "../../Commons/CommonComponents/AddDataModal";

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
